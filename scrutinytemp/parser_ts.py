import ezdxf
from ezdxf.addons import odafc
from ezdxf.math import Vec3
import os
import sys
from loggy import log_error  


def parse_entities(dw_file):
    """
    Extract and parse entities from a DXF file.

    Parameters:
    dw_file (str): The path to the DXF file.

    Returns:
    list: A list of dictionaries, where each dictionary represents an entity and its properties.
    """
    entities = []

    # Validate file existence and extension
    if not os.path.isfile(dw_file):
        log_error(f"File not found: {dw_file}")
        sys.exit()
    if not dw_file.endswith(('.dwg', '.dxf')):
        log_error(f"Unsupported file extension: {os.path.splitext(dw_file)[1]}")
        sys.exit()

    try:
        doc = ezdxf.readfile(dw_file)
        modelspace = doc.modelspace()
        for entity in modelspace:
            try:
                data = extract_entity_data(entity)
                entities.append(data)
            except AttributeError as e:
                log_error(f"AttributeError for entity {entity}: {str(e)}")
            except Exception as e:
                log_error(f"Unexpected error processing entity {entity}: {str(e)}")
    except ezdxf.DXFError as e:
        log_error(f"Error reading DXF file '{dw_file}': {str(e)}")
    except FileNotFoundError as e:
        log_error(f"File not found: {dw_file}")
    except Exception as e:
        log_error(f"Unexpected error: {str(e)}")

    return entities

def extract_entity_data(entity):
    """
    Extracts data from a DXF entity.

    Parameters:
    entity (DXFEntity): A DXF entity.

    Returns:
    dict: A dictionary containing extracted data.
    """
    data = {
        'Layer': entity.dxf.layer,
        'Type': entity.dxftype(),
        'Paperspace': entity.dxf.paperspace,
        'Color': entity.dxf.color,
        'RGB Code': None if entity.dxf.color < 1 or entity.dxf.color > 255 else ezdxf.colors.aci2rgb(entity.dxf.color),
        'Line Scale': entity.dxf.ltscale,
        'Transparency': entity.dxf.transparency,
        'Shadow mode': entity.dxf.shadow_mode,
        'Is invisible': entity.dxf.invisible,
    }

    # Extract additional attributes based on entity type
    if entity.dxftype() == 'LINE':
        data.update(extract_line_data(entity))
    elif entity.dxftype() == 'TEXT':
        data.update(extract_text_data(entity))
    elif entity.dxftype() == 'LWPOLYLINE':
        data.update(extract_lwpolyline_data(entity))
    elif entity.dxftype() == 'DIMENSION':
        data.update(dimension_info(entity))

    return data

def extract_line_data(entity):
    """
    Extracts line-specific data from a DXF entity.

    Parameters:
    entity (DXFEntity): A DXF line entity.

    Returns:
    dict: A dictionary containing line-specific data.
    """
    return {
        'StartPoint': entity.dxf.start,
        'EndPoint': entity.dxf.end,
        'Line Type': entity.dxf.linetype,
        'Line Weight': entity.dxf.lineweight,
        'Line thickness': entity.dxf.thickness,
        'Length': ((Vec3(entity.dxf.start)) - (Vec3(entity.dxf.end))).magnitude
    }

def extract_text_data(entity):
    """
    Extracts text-specific data from a DXF entity.

    Parameters:
    entity (DXFEntity): A DXF text entity.

    Returns:
    dict: A dictionary containing text-specific data.
    """
    return {
        'Text': entity.dxf.text,
        'Text Insertion Point': (entity.dxf.insert[0], entity.dxf.insert[1]),
        'Text Height': entity.dxf.height,
        'Text Width': entity.dxf.width,
        'Text Align point': (entity.dxf.align_point[0], entity.dxf.align_point[1]) if entity.dxf.align_point is not None else (0, 0),
        'Text Horizontal alignment flag': entity.dxf.halign,
        'Text Vertical alignment flag': entity.dxf.valign,
        'Text Rotation Angle': entity.dxf.rotation,
        'Text oblique angle': entity.dxf.oblique,
        'Text style': entity.dxf.style,
    }

def extract_lwpolyline_data(entity):
    """
    Extracts LWPOLYLINE-specific data from a DXF entity.

    Parameters:
    entity (DXFEntity): A DXF LWPOLYLINE entity.

    Returns:
    dict: A dictionary containing LWPOLYLINE-specific data.
    """
    vertices = []
    with entity.points() as points:
        vertices = list(points)
    vertices = [(vertex[0], vertex[1], vertex[4]) for vertex in vertices]

    return {
        'Polyline points(x, y, bulge)': vertices,
        'Polyline Elevation': entity.dxf.elevation,
        'Polyline flags': entity.dxf.flags,
        'Polyline const width': entity.dxf.const_width,
        'Polyline closed Status': entity.is_closed,
        'Polygon Area': calculate_polygon_area(vertices),
        'Polyline Length': polyline_length(vertices),
    }

def dimension_info(entity):
    if entity.dxftype() != 'DIMENSION':
        return {}

    dim_info = {
        'Dimension type': dimension_type_info(entity.dimtype),
        'Dimension block name': entity.dxf.geometry,
        'Dimension style': entity.dxf.dimstyle,
        'Dimension Rotation angle': entity.dxf.angle,
        'Dimension Leader length': entity.dxf.leader_length,
        'Dimension Insertion point': entity.dxf.insert,
        'Dimension Text attachment point': dimension_text_attach_info(entity.dxf.attachment_point),
    }

    if entity.dimtype == 0:
        dim_info['Dimension defpoint1'] = f"{entity.dxf.defpoint} (The defpoint1 specifies the dimension line location)"
        dim_info['Dimension defpoint2'] = f"{entity.dxf.defpoint2} (The defpoint2 specifies the start point of the first extension line)"
        dim_info['Dimension defpoint3'] = f"{entity.dxf.defpoint3} (The defpoint3 specifies the start point of the second extension line)"
        dim_info['Dimension defpoint4'] = f"{entity.dxf.defpoint4} (The defpoint1 and defpoint4 specify the endpoints of the line used to determine the second extension line for arc- and angular dimension)"
    elif entity.dimtype == 2:
        dim_info['Dimension defpoint1'] = f"{entity.dxf.defpoint} (The defpoint1 and defpoint4 specify the endpoints of the line used to determine the second extension line)"
        dim_info['Dimension defpoint2'] = f"{entity.dxf.defpoint2} (The defpoint2 and defpoint3 specify the endpoints of the line used to determine the first extension line)"
        dim_info['Dimension defpoint3'] = f"{entity.dxf.defpoint3} (The defpoint2 and defpoint3 specify the endpoints of the line used to determine the first extension line)"

    return dim_info

def dimension_type_info(dimtype):
    switcher = {
        0: 'Linear and Rotated Dimension',
        1: 'Aligned Dimension',
        2: 'Angular Dimension',
        3: 'Diameter Dimension',
        4: 'Radius Dimension',
        5: 'Angular 3P Dimension',
        6: 'Ordinate Dimension',
    }
    return switcher.get(dimtype, '')

def dimension_text_attach_info(attachtype):
    switcher = {
        1: 'Top left',
        2: 'Top center',
        3: 'Top right',
        4: 'Middle left',
        5: 'Middle center',
        6: 'Middle right',
        7: 'Bottom left',
        8: 'Bottom center',
        9: 'Bottom right',
    }
    return switcher.get(attachtype, '')

def calculate_polygon_area(vertices):
    """
    Calculate the area of a polygon given its vertices.

    Parameters:
    vertices (list): List of (x, y) tuples representing the polygon vertices.

    Returns:
    float: The area of the polygon.
    """
    area = 0.0
    for i in range(len(vertices)):
        j = (i + 1) % len(vertices)
        area += vertices[i][0] * vertices[j][1]
        area -= vertices[j][0] * vertices[i][1]
    area = abs(area) / 2.0
    return area

def polyline_length(vertices):
    """
    Calculate the length of a polyline given its vertices.

    Parameters:
    vertices (list): List of (x, y) tuples representing the polyline vertices.

    Returns:
    float: The length of the polyline.
    """
    length = 0.0
    for i in range(len(vertices) - 1):
        length += ((vertices[i][0] - vertices[i+1][0])**2 + (vertices[i][1] - vertices[i+1][1])**2)**0.5
    return length