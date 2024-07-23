import ezdxf
import pandas as pd
from ezdxf.addons import odafc
from ezdxf.math import Vec3
# Dependencies: Pandas, ezdxf,odafc 


def parse_entities(dwg_file):
    """
    Extract and parse entities from a DXF file.

    Parameters:
    dwg_file (str): The path to the DXF file.

    Returns:
    list: A list of dictionaries, where each dictionary represents an entity and its properties.
    """
    entities = []
    doc = ezdxf.readfile(dwg_file)
    modelspace = doc.modelspace()
    for entity in modelspace:
        # Extract data from the entity
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
            data['StartPoint'] = entity.dxf.start
            data['EndPoint'] = entity.dxf.end
            data['Line Type'] = entity.dxf.linetype
            data['Line Weight'] = entity.dxf.lineweight
            data['Line thickness'] = entity.dxf.thickness
            data['Length'] = ((Vec3(entity.dxf.start)) - (Vec3(entity.dxf.end))).magnitude
        elif entity.dxftype() == 'TEXT':
            data['Text'] = entity.dxf.text
            data['Text Insertion Point'] = (entity.dxf.insert[0], entity.dxf.insert[1])
            data['Text Height'] = entity.dxf.height
            data['Text Width'] = entity.dxf.width
            data['Text Align point'] = (entity.dxf.align_point[0], entity.dxf.align_point[1]) if entity.dxf.align_point is not None else (0, 0)
            data['Text Horizontal alignment flag'] = entity.dxf.halign
            data['Text Vertical alignment flag'] = entity.dxf.valign
            data['Text Rotation Angle'] = entity.dxf.rotation
            data['Text oblique angle'] = entity.dxf.oblique
            data['Text style'] = entity.dxf.style
        elif entity.dxftype() == 'LWPOLYLINE':
            # Extract polyline vertices to calculate area
            vertices = []
            with entity.points() as points:
                vertices = list(points)
            vertices = [(vertex[0], vertex[1], vertex[4]) for vertex in vertices]
            data['Polyline points(x, y, bulge)'] = vertices
            data['Polyline Elevation'] = entity.dxf.elevation
            data['Polyline flags'] = entity.dxf.flags
            data['Polyline const width'] = entity.dxf.const_width
            data['Polyline closed Status'] = entity.is_closed
            data['Polygon Area'] = calculate_polygon_area(vertices)
            data['Polyline Length'] = polyline_length(vertices)
        elif entity.dxftype() == 'DIMENSION':
            dimension_data = dimension_info(entity)
            data.update(dimension_data)

        entities.append(data)
    return entities    
#-------------------------------------------------------------------------------------------------------------------------------------------------------
"""These set of functions is to fetch data of dimension entity."""
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

def get_dimension_value(entity):
    if entity.dimtype in [0, 1, 2, 3, 4, 5, 6]:
        # Depending on the dimension type, you may need to retrieve the value differently
        if entity.dimtype in [0, 1, 3, 4]:
            return entity.dxf.text
        elif entity.dimtype == 2:
            return entity.dxf.angle_text
        elif entity.dimtype == 5:
            return entity.dxf.text1, entity.dxf.text2  # For angular 3P dimension, return two texts
        elif entity.dimtype == 6:
            return entity.dxf.text  # For ordinate dimension, return text
    return None

#---------------------------------------------------------------------------------------------------------------------------------------------------------
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



#---------------------------------------------------------------------------------------------------------------------------------------------------