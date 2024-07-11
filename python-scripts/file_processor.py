# import sys
# import json
# import ezdxf

# def convert_file_path(file_path):
#     transformed_path = file_path.replace("\\", "$").replace(":", "$")
#     return transformed_path

# def process_file(file_path):
#     di = {
#     "filePath": "_|_",
# }
#     di["filePath"] = file_path
#     return di

# if __name__ == "__main__":
#     file_path = sys.argv[1]
#     result = process_file(file_path)
#     print(json.dumps(result))


import ezdxf
import pandas as pd
from ezdxf.addons import odafc
from ezdxf.math import Vec3
import sys
import json

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
        elif entity.dxftype() == 'CIRCLE':
            data['Center'] = entity.dxf.center
            data['Radius'] = entity.dxf.radius
        elif entity.dxftype() == 'ARC':
            data['Center'] = entity.dxf.center
            data['Radius'] = entity.dxf.radius
            data['StartAngle'] = entity.dxf.start_angle
            data['EndAngle'] = entity.dxf.end_angle
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
            data['Polyline points(x, y, start_width, end_width, bulge)'] = vertices
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
def calculate_polygon_area(vertices):  #Function Under Research and Development due to some accuracy issue.
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
def create_dataframe(data):
    """
    Create a pandas DataFrame from the provided data dictionary.
    
    Parameters:
    - data (dict): Dictionary containing data to be converted into DataFrame.
    
    Returns:
    - df (pd.DataFrame): DataFrame created from the input data.
    """
    df = pd.DataFrame(data)
    return df


#---------------------------------------------------------------------------------------------------------------------------------------------------
def get_floor_count(df):
    floor_count = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 181), 'Layer'].nunique()
    return int(floor_count)

#---------------------------------------------------------------------------------------------------------------------------------------------------
def getBuildingHeight(df): 
    # Filter the DataFrame for lines with color 151
    lines_with_color_151 = df[(df['Type'] == 'LINE') & (df['Color'] == 151)]
    
    # Check if more than one line is found
    if lines_with_color_151.shape[0] > 1:
        raise ValueError("More than one line found with color 151")
    
    # Return the building height as the length of the first line
    return lines_with_color_151['Length'].values[0]

#---------------------------------------------------------------------------------------------------------------------------------------------------
def get_net_plot_area(df):
    """
    Calculate the net plot area from the input DataFrame.

    Parameters:
    df (pd.DataFrame): DataFrame containing entity data extracted from DXF files.

    Returns:
    float: The net plot area.
    """
    # Filter the DataFrame for LWPOLYLINE entities with color 7
    plot_area = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Layer'] == 'FLOOR-GROUND') & (df['Color'] == 7), 'Polygon Area']

    # Check if there is at least one LWPOLYLINE entity with color 7
    if plot_area.empty:
        raise ValueError("No LWPOLYLINE entities found with color 7.")

    # Calculate the net plot area as the sum of the polygon areas
    net_plot_area = plot_area.sum()

    # Round the net plot area to two decimal places
    net_plot_area = round(net_plot_area, 3)

    return net_plot_area

#---------------------------------------------------------------------------------------------------------------------------------------------------
def get_proposed_builtup_area(df):
    """
    Calculate the proposed builtup area based on the following conditions:
    - Entity type is 'LWPOLYLINE'
    - Polyline is closed
    - Color is 181
    
    Parameters:
    df (pandas.DataFrame): The DataFrame containing the DXF entity data.
    
    Returns:
    float: The total proposed builtup area.
    """
    # Filter the DataFrame based on the conditions
    builtup_area_df = df.loc[(df['Type'] == 'LWPOLYLINE') & 
                             (df['Polyline closed Status'] == True) &
                             (df['Color'].isin([181,4, 35])), 'Polygon Area']
    non_counted_far_area_df = df.loc[(df['Type'] == 'LWPOLYLINE') 
                                 & (df['Polyline closed Status'] == True) 
                                 & (df['Color'].isin([4, 35, 115])), 
                                 'Polygon Area'] 
    deductions_area_df = df.loc[(df['Type'] == 'LWPOLYLINE')& (df['Polyline closed Status'] == True) & (df['Color'] == 3), 'Polygon Area']
    
    # Calculate the total proposed builtup area
    total_builtup_area = builtup_area_df.sum()
    non_counted_far_area = non_counted_far_area_df.sum()
    deductions_area = deductions_area_df.sum()
    pba = total_builtup_area - (non_counted_far_area +  deductions_area)
    return round(pba, 3)

#-----------------------------------------------------------------------------------------------------------------------------------------------
def temp_create_data_dictionary_for_report(df):
    data_dictionary = {
        "Number of floors:": int(get_floor_count(df)),
        "Building height:": getBuildingHeight(df),
        "Proposed_builtup_area:": get_proposed_builtup_area(df),
        "Plot area:": get_net_plot_area(df),
    }
    return data_dictionary
#-----------------------------------------------------------------------------------------------------------------------------------------------

def mainParser(dwgFileName):
    entities = parse_entities(dwgFileName)
    df = create_dataframe(entities)
    return temp_create_data_dictionary_for_report(df)
    
#--------------------------------------------------------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    result_dict = mainParser(file_path)
    print(json.dumps(result_dict, indent=4))