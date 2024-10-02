import pandas as pd
import sys
import json
import re
from shapely.geometry import Point, Polygon, LineString
from scipy.spatial import KDTree
from ezdxf.math import Vec3
import numpy as np
import parser_ts  
from loggy import log_error

def create_dataframe(data: dict) -> pd.DataFrame:
    """
    Create a pandas DataFrame from the provided data dictionary.

    Parameters:
    - data (dict): Dictionary containing data to be converted into DataFrame.

    Returns:
    - df (pd.DataFrame): DataFrame created from the input data.
    """
    try:
        df = update_polygon_text(pd.DataFrame(data), [4,3,115,11,22])
        return df
    except Exception as e:
        log_error(f"Error creating DataFrame: {e}")
        raise

def get_floor_count(df: pd.DataFrame) -> int:
    """
    Get the number of unique floors from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - int: Number of unique floors.
    """
    try:
        floor_count = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 181), 'Layer'].nunique()
        return int(floor_count)
    except Exception as e:
        log_error(f"Error getting floor count: {e}")
        raise

def get_calculated_far(df: pd.DataFrame) -> float:
    """
    Calculate Floor Area Ratio (FAR) from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Calculated FAR.
    """
    try:
        area_of_floors = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline flags'] == 1) & 
            (df['Color'].isin([181, 4, 35, 120])), 'Polygon Area'
        ].sum()

        deductions_1 = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline flags'] == 1) & 
            (df['Color'].isin([115, 51, 4, 35, 120])), 'Polygon Area'
        ].sum()

        deductions_area = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) & (df['Color'] == 3), 
            'Polygon Area'
        ].sum()

        plot_ar = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Color'] == 7) & (df['Polyline flags'] == 1), 
            'Polygon Area'
        ].iloc[0]

        floor_ar = float((area_of_floors - (deductions_1 + deductions_area)) / plot_ar)

        return round(floor_ar, 4)
    except Exception as e:
        log_error(f"Error calculating FAR: {e}")
        raise

def get_building_height(df: pd.DataFrame) -> float:
    """
    Get the building height from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Building height.
    """
    try:
        lines_with_color_151 = df[(df['Type'] == 'LINE') & (df['Color'] == 151)]
        if lines_with_color_151.shape[0] > 1:
            raise ValueError("More than one line found with color 151")
        return round(lines_with_color_151['Length'].values[0], 2)
    except Exception as e:
        log_error(f"Error getting building height: {e}")
        raise

def get_gross_plot_area(df: pd.DataFrame) -> float:
    """
    Calculate the net plot area from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Net plot area.
    """
    try:
        plot_area = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Layer'] == 'FLOOR-GROUND') & (df['Color'] == 7), 
            'Polygon Area'
        ]
        if plot_area.empty:
            raise ValueError("No LWPOLYLINE entities found in reserved color.")
        net_plot_area = plot_area.sum()
        return round(net_plot_area, 3)
    except Exception as e:
        log_error(f"Error calculating net plot area: {e}")
        raise

def get_net_plot_area(df: pd.DataFrame) -> float:
    """
    Calculate the net plot area from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Net plot area.
    """
    try:
        gross_plot_arr = get_gross_plot_area(df)
        road_widen_arr = get_road_widening_area(df)
        
        net_plot_area = gross_plot_arr - road_widen_arr
        return round(net_plot_area, 3)
    except Exception as e:
        log_error(f"Error calculating net plot area: {e}")
        raise

def get_proposed_builtup_area(df: pd.DataFrame) -> float:
    """
    Calculate the proposed builtup area from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Proposed builtup area.
    """
    try:
        builtup_area_df = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) &
            (df['Color'].isin([181, 4, 35, 120])), 'Polygon Area'
        ]
        non_counted_far_area_df = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) &
            (df['Color'].isin([4, 35, 51, 115, 120])), 'Polygon Area'
        ]
        deductions_area_df = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) & (df['Color'] == 3), 
            'Polygon Area'
        ]

        total_builtup_area = builtup_area_df.sum()
        non_counted_far_area = non_counted_far_area_df.sum()
        deductions_area = deductions_area_df.sum()
        
        pba = total_builtup_area - (non_counted_far_area + deductions_area)
        return round(pba, 2)
    except Exception as e:
        log_error(f"Error calculating proposed builtup area: {e}")
        raise

def get_calculated_gc_percentage(df: pd.DataFrame) -> float:
    """
    Calculate Ground Coverage percentage from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Ground Coverage percentage.
    """
    try:
        plot_ar = df.loc[
            (df['Layer'] == 'FLOOR-GROUND') & (df['Type'] == 'LWPOLYLINE') & 
            (df['Color'] == 7) & (df['Polyline flags'] == 1), 'Polygon Area'
        ]
        if plot_ar.empty:
            raise ValueError("Plot area not found with color 7 and polyline flags 1")
        plot_ar_value = plot_ar.iloc[0] if not plot_ar.empty else 0.0

        builtup_area = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline flags'] == 1) & 
            (df['Layer'] == 'FLOOR-GROUND') & (df['Color'] == 10), 'Polygon Area'
        ]
        if builtup_area.empty:
            raise ValueError("Built-up area not found with color 10, polyline flags 1, and layer FLOOR-GROUND")
        builtup_area_value = builtup_area.iloc[0] if not builtup_area.empty else 0.0

        non_counted_far_area_df = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) &
            (df['Layer'] == 'FLOOR-GROUND') & (df['Color'].isin([4, 115])), 'Polygon Area'
        ]
        non_counted_far_value = non_counted_far_area_df.iloc[0] if not non_counted_far_area_df.empty else 0.0

        deductions_area_df = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) &
            (df['Layer'] == 'FLOOR-GROUND') & (df['Color'].isin([3])), 'Polygon Area'
        ]
        deductions_area_value = deductions_area_df.iloc[0] if not deductions_area_df.empty else 0.0

        if builtup_area_value > 0:
            ground_coverage = ((builtup_area_value - (non_counted_far_value + deductions_area_value)) / plot_ar_value) * 100
        else:
            raise ValueError("Built-up area is zero. Cannot calculate ground coverage.")
        
        return round(ground_coverage, 2)
    except Exception as e:
        log_error(f"Error calculating ground coverage percentage: {e}")
        raise

def get_road_width(df: pd.DataFrame) -> float:
    """
    Calculate the road width from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - float: Road width.
    """
    try:
        road_lines = df.loc[
            (df['Type'] == 'LINE') & (df['Color'] == 41),'Length']

        # Check if there are any lines with color 41
        if road_lines.empty:
            raise ValueError("No LINE entities found with color 41.")

        # Assuming there's only one road line for width, get the first entry
        road_width = road_lines.iloc[0]

        # Round the road width to two decimal places
        road_width = round(road_width, 2)

        return road_width

    except Exception as e:
        log_error(f"Error calculating road width: {e}")
        raise

def get_frontage_of_plot(df: pd.DataFrame) -> float:
    """
    Calculate the frontage of the plot from the input DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data extracted from DXF files.

    Returns:
    - float: The frontage of the plot.
    """
    try:
        # Filter the DataFrame for LWPOLYLINE entities with color 96 and flag 0
        plot_frontage = df.loc[
            (df['Type'] == 'LWPOLYLINE') & (df['Color'] == 96) & (df['Polyline flags'] == 0), 'Polyline Length'
        ]

        # Check if there is at least one LWPOLYLINE entity with color 96 and flag 0
        if plot_frontage.empty:
            raise ValueError("No LWPOLYLINE entities found with color 96 and flag 0.")

        # Calculate the frontage of the plot as the length of the single line
        frontage_of_plot = plot_frontage.iloc[0]

        # Round the frontage of the plot to two decimal places
        frontage_of_plot = round(frontage_of_plot, 2)

        return frontage_of_plot

    except Exception as e:
        log_error(f"Error calculating frontage of plot: {e}")
        raise


def get_basement_mos(df):
    # Initialize dictionary to store the open space results
    basement_open_spaces = {}

    # Check for basement floors
    basement_layers = df[df['Layer'].str.contains(r'FLOOR-BF\d')]['Layer'].unique()
    #Reduce data farme to specific condition
    ground_df = df[(df['Layer'] == 'FLOOR-GROUND') | (df['Layer'].isin(basement_layers))]

    # For each basement floor
    for layer in basement_layers:
        basement_open_spaces['Basement Front Open Space '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",4,32,None,"line_to_polyline",layer)
        basement_open_spaces['Basement Side1 Open Space '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",6,32,None,"line_to_polyline",layer)
        basement_open_spaces['Basement Side2 Open Space '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",2,32,None,"line_to_polyline",layer)
        basement_open_spaces['Basement Rear Open Space '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",3,32,None,"line_to_polyline",layer)
        
        
        

    # Step 5: Return the collected values for open spaces
    return basement_open_spaces


def service_floor_check(df):
    """
    This function checks if 'FLOOR-SERVICE' or 'FLOOR-SERVICE-EX' is present in the Layer column,
    then checks if there's a polyline with Color == 4 and text == 'Service' in the corresponding row.
    If the conditions are met, it returns site_area_provided as the rounded value of the 'Polygon Area' column.
    If any condition fails, it returns None.
    """
    #an error dictionary to capture functional errors
    error_dict = {}

    #Check if 'FLOOR-SERVICE' or 'FLOOR-SERVICE-EX' is present in the Layer column
    service_layer_present = df[df['Layer'].isin(['FLOOR-SERVICE', 'FLOOR-SERVICE-EX'])]

    # If no service layer is found, return None
    if service_layer_present.empty:
        return None

    #Check for a polyline with Color == 4 and Text == 'Service' in the same row
    service_row = service_layer_present[
        (service_layer_present['Color'] == 4) & (service_layer_present['Type'] == 'LWPOLYLINE') &
        (service_layer_present['Text'] == 'Service')
    ]

    #If no polyline with Color == 4 and Text == 'Service' is found, return None
    if service_row.empty:
        error_dict['Text Error'] = "Functional Error: Polyline with Color 4 and Text 'Service' not found."
        return None

    #Return the site_area_provided (Polygon Area rounded to 2 decimals)
    site_area_provided = round(get_net_plot_area(df), 2)
    
    return site_area_provided   


def podium_floor_check(df):
    """
    This function checks for the presence of 'FLOOR-PODIUM', 'FLOOR-PODIUM-EX', and any layer starting with 'FLOOR-PODIUM-PF'
    (e.g., FLOOR-PODIUM-PF1, FLOOR-PODIUM-PF10, etc.), verifies that polylines have Color == 5 in these layers, and returns:
        - Total Podium Area (sum of Polygon Areas of Color 5 polylines in relevant layers)
        - Count of distinct podium floors.
    
    Returns:
        - Total Podium Area (sum of Polygon Areas of Color 5 polylines in relevant layers)
        - Count of distinct podium floors
    """
    # Regular expression pattern to match podium layers: FLOOR-PODIUM, FLOOR-PODIUM-EX, and FLOOR-PODIUM-PF<n>
    podium_layer_pattern = re.compile(r'^FLOOR-PODIUM(-EX)?(-PF\d+)?$')

    # Step 1: Filter for rows where Layer matches the podium pattern and Color == 5 for polyline (LWPOLYLINE)
    podium_rows = df[(df['Layer'].apply(lambda x: bool(podium_layer_pattern.match(x)))) & 
                     (df['Color'] == 5) & (df['Type'] == 'LWPOLYLINE')]

    # If no matching rows are found, return 0 for both total area and count
    if podium_rows.empty:
        return [None, None]

    # Step 2: Calculate the total podium area (sum of Polygon Areas rounded to 2 decimals)
    total_podium_area = round(podium_rows['Polygon Area'].sum(), 2)

    # Step 3: Count distinct podium floors by checking for unique layers that match the 'FLOOR-PODIUM-PF<n>' pattern
    unique_podium_floors = int(podium_rows['Layer'].apply(lambda x: re.match(r'^FLOOR-PODIUM-PF\d+$', x) is not None).sum())

    # Return the total podium area and the count of podium floors
    return [get_net_plot_area(df), unique_podium_floors]


def get_road_widening_area(df):
    """
    This function filters the dataframe to find rows where:
    - Type == 'LWPOLYLINE'
    - Color == 118
    - Layer is one of the following: 
      ['FLOOR-GROUND', 'FLOOR-STILT', 'FLOOR-PODIUM', 
       'FLOOR-GROUND-EX', 'FLOOR-STILT-EX', 'FLOOR-PODIUM-EX']
    
    It returns the area of the first matching row, ensuring only one area value is returned.
    If no matching rows are found, it returns 0.
    
    Parameters:
        df (pandas.DataFrame): The dataframe containing DXF entity information.
        
    Returns:
        float: The area of the first polyline of Color 118 in the specified layers. 
               Returns 0 if no such polyline is found.
    """
    # Define the target layers
    target_layers = [
        'FLOOR-GROUND', 'FLOOR-STILT', 'FLOOR-PODIUM',
        'FLOOR-GROUND-EX', 'FLOOR-STILT-EX', 'FLOOR-PODIUM-EX'
    ]

    #Filter the dataframe for Type == 'LWPOLYLINE', Color == 118, and Layer in target layers
    filtered_df = df[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Color'] == 118) &
        (df['Layer'].isin(target_layers))
    ]
    
    #If no rows are found, return 0
    if filtered_df.empty:
        return 0.0

    #Return the Polygon Area of the first matching row
    area_value = round(filtered_df['Polygon Area'].iloc[0], 2)
    return area_value



def get_projection_clearance(df):
    # Initialize dictionary to store the open space results
    projection_clearances = {}

    # Check for projection layer
    projection_layer = [
        'FLOOR-GROUND', 'FLOOR-STILT', 'FLOOR-PODIUM',
        'FLOOR-GROUND-EX', 'FLOOR-STILT-EX', 'FLOOR-PODIUM-EX'
    ]

    
    # Filter the dataframe and get the unique layer
    unique_layers = df[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Color'] == 234) &
        (df['Layer'].isin(projection_layer))
    ]['Layer'].unique()

     #Reduce data farme to specific condition
    ground_df = df[(df['Layer'] == 'FLOOR-GROUND') | (df['Layer'].isin(unique_layers))]

    # Check if any rows are found
    if len(unique_layers) == 0: 
        # Return None if no polygon is found
        return None
        
    else:
        # Ensure that the polygon is found in exactly one layer
        if len(unique_layers) == 1:
            layer = unique_layers[0]  # Return the layer name
            projection_clearances['Projection plot clerance front at '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",4,234,None,"line_to_polyline",layer)
            projection_clearances['Projection plot clerance side1 at '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",6,234,None,"line_to_polyline",layer)
            projection_clearances['Projection plot clerance side2 at '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",2,234,None,"line_to_polyline",layer)
            projection_clearances['Projection plot clerance rear at '+layer] = find_closest_distance(ground_df,"FLOOR-GROUND",3,234,None,"line_to_polyline",layer)
            #Return the collected values for open spaces
            return projection_clearances
        else:
            return None  # Return None if the polygon exists in multiple layers 




def interpolate_points(start, end, num_points=50):
    # Generate interpolated points between start and end
    return [start.lerp(end, factor) for factor in (i / (num_points - 1) for i in range(num_points))]

def interpolate_polyline(polyline_vertices, num_interpolation_points=50):
    # Interpolate points for each segment of the polyline
    interpolated_points = []
    for i in range(len(polyline_vertices) - 1):
        start = polyline_vertices[i]
        end = polyline_vertices[i + 1]
        interpolated_points.extend(interpolate_points(start, end, num_interpolation_points))
    return interpolated_points

def vec3_to_tuple(vec3):
    # Convert Vec3 to tuple (x, y, z)
    return (vec3.x, vec3.y, vec3.z)


def get_polygon_dimensions(df, layer, color):
    """
    Filters the DataFrame based on the specified layer and color, then calculates
    the bounding box dimensions (width and length) of all polygons in the filtered data.
    Returns two dictionaries: one for polygon names with their widths, and another for polygon names
    with their lengths.

    Args:
        df (pd.DataFrame): The DataFrame containing polygon data.
        layer (str): The layer to filter polygons.
        color (int): The color to filter polygons.

    Returns:
        tuple: Two dictionaries, one with polygon names and their widths,
               and another with polygon names and their lengths.
    """
    
    # Filter the dataframe based on layer and color
    filtered_df = df[(df['Layer'] == layer) & (df['Type'] == 'LWPOLYLINE') & (df['Color'] == color)]
    
    # Initialize dictionaries to store polygon names with their widths and lengths
    polygon_widths = {}
    polygon_lengths = {}
    
    # Function to calculate the Euclidean distance between two points
    def distance(point1, point2):
        return np.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2)
    
    # Iterate through each polygon in the filtered dataframe
    for index, row in filtered_df.iterrows():
        # Extract the polyline points (x, y, bulge) from the row
        polygon_points = row['Polyline points(x, y, bulge)']

        # Check if polygon_points is a valid list
        if not isinstance(polygon_points, list):
            continue  # Skip this row if polygon_points is not a list
        
        # Extract only the (x, y) coordinates, ignoring the bulge value
        try:
            vertices = [(x, y) for x, y, bulge in polygon_points]
        except ValueError:
            continue  # Skip this row if the format of points is incorrect

        # Calculate bounding box of the polygon
        xs, ys = zip(*vertices)
        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)
        
        width = max_x - min_x
        length = max_y - min_y
        
        # Format polygon name
        polygon_name = f"Polygon-{index}"
        
        polygon_widths[polygon_name] = round(width,2)
        polygon_lengths[polygon_name] = round(length,2)

    return polygon_widths, polygon_lengths




def get_terrace_service_area(df):
    terrace_service_area_df = df.loc[
            (df['Layer'] == 'FLOOR-TERRACE') & (df['Type'] == 'LWPOLYLINE') & (df['Polyline closed Status'] == True) &
            (df['Color'].isin([4,11,112])), 'Polygon Area']
    
    terrace_service_area =terrace_service_area_df.sum()
    return round(terrace_service_area, 2)




def find_closest_distance(df, mos_layer, mos_color, polyline_1_color, polyline_2_color=None, mode="line_to_polyline", polyline_1_layer = "FLOOR-GROUND", num_interpolation_points=50, idx=None):
    lines = []
    polylines_1 = []
    polylines_2 = []

    # Collect points from DataFrame based on the selected mode
    for i, row in df.iterrows():
        if mode == "line_to_polyline":
            # Check for lines and the first polyline
            if row['Layer'] == mos_layer and row['Type'] == 'LINE' and row['Color'] == mos_color:
                start = Vec3(row['StartPoint'])
                end = Vec3(row['EndPoint'])
                lines.append((start, end))

            elif row['Layer'] == polyline_1_layer and row['Type'] == 'LWPOLYLINE' and row['Color'] == polyline_1_color:
                # If idx is provided, skip rows not matching the index
                if idx is not None and i != idx:
                    continue
                polyline_vertices_1 = [Vec3(x, y, 0) for (x, y, _) in row['Polyline points(x, y, bulge)']]
                polylines_1.append(polyline_vertices_1)

        elif mode == "polyline_to_polyline":
            # Check for the first and second polylines
            if row['Layer'] == mos_layer and row['Type'] == 'LWPOLYLINE' and row['Color'] == polyline_1_color:
                # If idx is provided, skip rows not matching the index
                if idx is not None and i != idx:
                    continue
                polyline_vertices_1 = [Vec3(x, y, 0) for (x, y, _) in row['Polyline points(x, y, bulge)']]
                polylines_1.append(polyline_vertices_1)

            elif row['Layer'] == mos_layer and row['Type'] == 'LWPOLYLINE' and row['Color'] == polyline_2_color:
                polyline_vertices_2 = [Vec3(x, y, 0) for (x, y, _) in row['Polyline points(x, y, bulge)']]
                polylines_2.append(polyline_vertices_2)

    # Validate collected points based on mode
    if mode == "line_to_polyline":
        if not lines:
            raise ValueError("No line with the specified color found in the DataFrame.")
        if not polylines_1:
            raise ValueError("No polyline with the specified polyline_1_color found in the DataFrame.")
    elif mode == "polyline_to_polyline":
        if not polylines_1 or not polylines_2:
            raise ValueError("Polylines with the specified colors not found in the DataFrame.")

    min_distance = float('inf')

    # Mode 1: Find distance between line and polyline
    if mode == "line_to_polyline":
        for line_start, line_end in lines:
            # Interpolate line points
            interpolated_line_points = interpolate_points(line_start, line_end, num_interpolation_points)

            for polyline_vertices in polylines_1:
                # Interpolate polyline points
                interpolated_polyline_points = interpolate_polyline(polyline_vertices, num_interpolation_points)

                # Build KD-Tree for polyline points
                tree = KDTree([vec3_to_tuple(p) for p in interpolated_polyline_points])

                # Find the closest point on the polyline for each line point
                for line_point in interpolated_line_points:
                    distance, _ = tree.query(vec3_to_tuple(line_point))

                    # Update minimum distance if a closer point is found
                    if distance < min_distance:
                        min_distance = distance

    # Mode 2: Find distance between two polylines
    elif mode == "polyline_to_polyline" and polyline_2_color is not None:
        for polyline_vertices_1 in polylines_1:
            interpolated_polyline_points_1 = interpolate_polyline(polyline_vertices_1, num_interpolation_points)

            # Build KD-Tree for the first polyline
            tree_1 = KDTree([vec3_to_tuple(p) for p in interpolated_polyline_points_1])

            for polyline_vertices_2 in polylines_2:
                interpolated_polyline_points_2 = interpolate_polyline(polyline_vertices_2, num_interpolation_points)

                # Build KD-Tree for the second polyline
                tree_2 = KDTree([vec3_to_tuple(p) for p in interpolated_polyline_points_2])

                # Find closest point between polyline 1 and polyline 2
                for point in interpolated_polyline_points_1:
                    distance, _ = tree_2.query(vec3_to_tuple(point))

                    if distance < min_distance:
                        min_distance = distance

    # Return the minimum distance rounded to 2 decimal places
    return round(min_distance, 2)



def get_septic_tank_details(df):
    # Filter for septic tank polygons and text
    septic_tank_df = df.loc[
        (df['Layer'] == 'FLOOR-GROUND') & 
        (df['Type'].isin(['LWPOLYLINE', 'TEXT'])) & 
        (df['Color'] == 112)
    ]
    
    # Get all distinct septic tank polygons
    polyline_df = septic_tank_df[
        (septic_tank_df['Type'] == 'LWPOLYLINE') & 
        (septic_tank_df['Polyline closed Status'] == True)
    ]
    
    if polyline_df.empty:
        return  None
    
    septic_tank_details = {}

    for i, polygon_row in polyline_df.iterrows():
        # Get the polyline points and extract x, y coordinates
        polyline_points = polygon_row['Polyline points(x, y, bulge)']
        polygon_coords = [(point[0], point[1]) for point in polyline_points if len(point) >= 2]
        polygon = Polygon(polygon_coords)  # Create a Shapely polygon
        
        # Filter text entities based on whether their insertion point is inside the polygon
        def point_within_polygon(text_insertion_point):
            if isinstance(text_insertion_point, tuple) and len(text_insertion_point) == 2:
                return polygon.contains(Point(text_insertion_point))
            return False  # If not a valid point, return False
        
        # Filter for text entities whose "Text Insertion Point" is inside the polygon
        text_entities = septic_tank_df[
            (septic_tank_df['Type'] == 'TEXT') &
            septic_tank_df['Text Insertion Point'].apply(point_within_polygon)
        ]['Text'].values
        
        if len(text_entities) < 2:
            #print(f"Skipping septic tank at index {i}: Insufficient text entities found.")
            continue

        # Assume the first text entity is the septic tank name
        septic_tank_name = text_entities[0]

        # Assume the second text entity is the dimensions in the format "1 x 1 x 1"
        dimensions_text = text_entities[1]
        
        # Normalize and clean up the dimensions text
        try:
            cleaned_dimensions = re.sub(r'\s*[xX]\s*', ' x ', dimensions_text.strip())
            match = re.match(r'(\d+(\.\d+)?) x (\d+(\.\d+)?) x (\d+(\.\d+)?)', cleaned_dimensions)
            
            if match:
                length, width, depth = map(float, match.groups()[::2])  # Extract matched groups
            else:
                raise ValueError(f"Unrecognized dimensions format: {dimensions_text}")

        except ValueError as e:
            #print(f"Skipping septic tank at index {i}: Invalid dimensions format: {str(e)}")
            continue

        # Create a unique key for each septic tank
        septic_tank_key = f"Septic Tank {i + 1}"

        # Store the details in a dictionary
        septic_tank_details[septic_tank_key] = {
            "Septic Tank Name": septic_tank_name,
            "Septic Tank Location from building": find_closest_distance(df, "FLOOR-GROUND", None, 112, 10, "polyline_to_polyline", idx=i),
            "Septic Tank Volume": round(polygon.area * depth, 2),
            "Septic Tank Length": length,
            "Septic Tank Width": width,
            "Septic Tank Depth": depth,
        }

    return septic_tank_details




def check_balcony_containment(df):
    # Filter the DataFrame for polygons of color 35
    polygon_35_df = df.loc[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Polyline closed Status'] == True) &
        (df['Color'] == 35)
    ]
    
    if polygon_35_df.empty:
        return "Not Connected"

    # Filter the DataFrame for polygons of color 20 or 40
    polygon_20_40_df = df.loc[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Polyline closed Status'] == True) &
        (df['Color'].isin([20, 40]))
    ]
    
    if polygon_20_40_df.empty:
        return "Not Connected"

    containment_status_dict = {}

    # Iterate over each polygon_35 instance
    for idx_35, polygon_35_row in polygon_35_df.iterrows():
        polygon_35_points = polygon_35_row['Polyline points(x, y, bulge)']
        polygon_35_coords = [(point[0], point[1]) for point in polygon_35_points]
        polygon_35 = Polygon(polygon_35_coords)

        # Create a list of edges (LineString) from the polygon_35 points
        polygon_35_edges = [LineString([polygon_35_coords[i], polygon_35_coords[(i + 1) % len(polygon_35_coords)]])
                            for i in range(len(polygon_35_coords))]

        is_contained = False

        # Check containment against each polygon_20_or_40
        for idx_20_40, polygon_20_40_row in polygon_20_40_df.iterrows():
            polygon_20_40_points = polygon_20_40_row['Polyline points(x, y, bulge)']
            polygon_20_40_coords = [(point[0], point[1]) for point in polygon_20_40_points]
            polygon_20_40 = Polygon(polygon_20_40_coords)

            # Check if any edge of polygon_35 intersects with polygon_20_40
            for edge in polygon_35_edges:
                if polygon_20_40.intersects(edge):
                    containment_status_dict[f'balcony_instance_{idx_35}'] = f"Connected to polygon of color {polygon_20_40_row['Color']} at index {idx_20_40}"
                    is_contained = True
                    break

            # If no edge intersects, check if at least 2 points of polygon_35 are inside polygon_20_40
            if not is_contained:
                inside_points = sum(1 for point in polygon_35_coords if polygon_20_40.contains(Point(point)))
                if inside_points >= 2:
                    containment_status_dict[f'balcony_instance_{idx_35}'] = f"Connected to polygon polygon of color {polygon_20_40_row['Color']} at index {idx_20_40}"
                    is_contained = True
                    break

        if not is_contained:
            #containment_status[f'balcony_instance_{idx_35}'] = "Not Connected to polygon any polygon of color 20 or 40"
            containment_status = "Not connected"
        else:
            containment_status = "Connected"

    return containment_status





def check_polygon_containment(df, layer, polygon_1_color, polygon_2_color):
    # Filter the DataFrame for the specified layer and polygon_1 color
    polygon_1_df = df.loc[
        (df['Layer'] == layer) &
        (df['Color'] == polygon_1_color) &
        (df['Type'] == 'LWPOLYLINE') &
        (df['Polyline closed Status'] == True)
    ]
    
    # Ensure there's only one polygon_1
    if len(polygon_1_df) != 1:
        raise ValueError("Expected exactly one instance of polygon_1 in the specified layer.")
    
    # Get the points for polygon_1 and create a Shapely Polygon object
    polygon_1_points = polygon_1_df.iloc[0]['Polyline points(x, y, bulge)']
    polygon_1_coords = [(point[0], point[1]) for point in polygon_1_points]
    polygon_1 = Polygon(polygon_1_coords)
    
    # Filter the DataFrame for the specified layer and polygon_2 color
    polygon_2_df = df.loc[
        (df['Layer'] == layer) &
        (df['Color'] == polygon_2_color) &
        (df['Type'] == 'LWPOLYLINE') &
        (df['Polyline closed Status'] == True)
    ]
    
    if polygon_2_df.empty:
        raise ValueError("No instances of polygon_2 found in the specified layer.")
    
    containment_status = {}
    
    # Iterate over each polygon_2 instance and check containment
    for idx, polygon_2_row in polygon_2_df.iterrows():
        polygon_2_points = polygon_2_row['Polyline points(x, y, bulge)']
        polygon_2_coords = [(point[0], point[1]) for point in polygon_2_points]
        polygon_2 = Polygon(polygon_2_coords)
        
        # Check if polygon_2 is inside or outside polygon_1
        if polygon_1.contains(polygon_2):
            containment_status[f'polygon_2_instance_{idx}'] = "Inside"
        else:
            containment_status[f'polygon_2_instance_{idx}'] = "Outside"
    
    return containment_status



def get_polygon_intersections(df, color_1, color_2):
    # Filter the DataFrame for polygons of color_1
    polygon_1_df = df.loc[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Polyline closed Status'] == True) &
        (df['Color'] == color_1)
    ]
    
    # Filter the DataFrame for polygons of color_2
    polygon_2_df = df.loc[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Polyline closed Status'] == True) &
        (df['Color'] == color_2)
    ]
    
    if polygon_1_df.empty:
        return None #f"No polygons of color {color_1} found."
    if polygon_2_df.empty:
        return None #f"No polygons of color {color_2} found."
    
    # Dictionary to store the results
    intersection_results = {}
    
    # Iterate over each polygon_2 instance
    for idx_2, polygon_2_row in polygon_2_df.iterrows():
        polygon_2_points = polygon_2_row['Polyline points(x, y, bulge)']
        polygon_2_coords = [(point[0], point[1]) for point in polygon_2_points]
        polygon_2 = Polygon(polygon_2_coords)
        
        total_intersection_area = 0  # To store the total intersection area
        layer_name = polygon_2_row['Layer']
        # Check against each polygon_1 instance for intersections
        for idx_1, polygon_1_row in polygon_1_df.iterrows():
            polygon_1_points = polygon_1_row['Polyline points(x, y, bulge)']
            polygon_1_coords = [(point[0], point[1]) for point in polygon_1_points]
            polygon_1 = Polygon(polygon_1_coords)
            
            # Check if there is an intersection
            if polygon_1.intersects(polygon_2):
                # Calculate the area of intersection
                intersection_area = polygon_1.intersection(polygon_2).area
                total_intersection_area += intersection_area  # Sum the areas
        
        # Add to the result dictionary for the current polygon_2 instance
        if total_intersection_area > 0:
            intersection_results[f'courtyard at_{idx_2}_layer_{layer_name}'] = round(total_intersection_area, 2)
        else:
            intersection_results[f'polygon_2_instance_{idx_2}_layer_{layer_name}'] = None
    return intersection_results


def get_courtyard_area_and_side(df,color_code):
 """
    Retrieve the first instance of the polygon area where Type is 'LWPOLYLINE' and Color is 40,
    from each layer in the DataFrame, and return both the area and the corresponding layer name.

    Args:
        df (pd.DataFrame): DataFrame containing polygon data.

    Returns:
        tuple: The polygon area (rounded to 2 decimal places) and the corresponding layer name.

    Raises:
        ValueError: If no matching entity is found or an error occurs.
    """
 try:

        # Filter rows where 'Type' is 'LWPOLYLINE' and 'Color' matches the color_code
        filtered_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == color_code)]

        # Group by 'Layer' and take the first entry for each group
        i_courtyard_area_df = filtered_df.groupby('Layer').head(1).dropna(subset=['Polygon Area', 'Layer'])
       

        if i_courtyard_area_df.empty:
            return [None, None]

        # Get the first area value and its corresponding layer
        i_courtyard_area = i_courtyard_area_df.iloc[0]['Polygon Area']
        layer_name = i_courtyard_area_df.iloc[0]['Layer']
        i_courtyard_side = get_polygon_dimensions(df, layer_name, color_code)[1]
        return [round(i_courtyard_area, 2), i_courtyard_side]

 except Exception as e:
        log_error(f"Error calculating first plot area: {e}")
        raise


def get_line_length_by_layer_and_color(df, layer_name, color):
    """
    Retrieve the length of 'LINE' type entities from the DataFrame based on the provided layer name and color value.
    
    Args:
        df (pd.DataFrame): The DataFrame containing DXF data.
        layer_name (str): The name of the layer to filter by.
        color (int): The color value to filter by.
    
    Returns:
        float: The length of the first matching 'LINE' entity.
    
    Raises:
        ValueError: If no LINE entity with the specified color is found in the filtered DataFrame.
    """
    try:
        # Filter the DataFrame based on the given layer and type 'LINE'
        filtered_df = df[(df['Layer'] == layer_name) & (df['Type'] == 'LINE') & (df['Color'] == color)]

        # Check if any matching entity was found
        if filtered_df.empty:
            raise ValueError(f"No LINE entity found with color {color} in layer '{layer_name}'")
        
        # Return the first matching 'Length' value
        return round(filtered_df.iloc[0]['Length'],2)
    
    except Exception as e:
        log_error(f"Error retrieving length for color {color}: {e}")
        raise


def get_highest_numeric_value(df, color_code):
    # Used to get the dwelling unit.
    # Filter the dataframe for text entities of the given color
    text_entities_df = df.loc[
        (df['Type'] == 'TEXT') &
        (df['Color'] == color_code)
    ].copy()  # Create a copy to avoid SettingWithCopyWarning

    # Further filter the text column for numeric (int) values
    text_entities_df.loc[:, 'Numeric Values'] = text_entities_df['Text'].apply(
        lambda x: [int(num) for num in x.split() if num.isdigit()]
    )
    
    # Flatten the list of numeric values and find the highest number
    numeric_values = [num for sublist in text_entities_df['Numeric Values'] for num in sublist]
    
    if numeric_values:
        return max(numeric_values)
    else:
        return "Not Provided"
    


def generate_height_report(df: pd.DataFrame, parameter_name: str, color: int) -> list:
    # Filter the DataFrame based on Type == 'LINE' and Color == color
    filtered_df = df[(df['Type'] == 'LINE') & (df['Color'] == color)]
    
    # Create a dictionary with Layer as keys and Length as values
    layer_length_dict = filtered_df.groupby('Layer')['Length'].mean().to_dict()

    # Prepare the JSON output list
    json_output = []
    
    # Define constants for the report
    rules_table = 'N.A.' #BVR 69(1)'
    block_name = 'Single'
    minimum_required = 'N.A.' #2.60
    maximum_permissible = 'N.A.'
    
    # Populate the JSON output
    for layer, length in layer_length_dict.items():
        json_output.append({
            'rulesTable': rules_table,
            'blockName': block_name,
            'floorName': layer,
            'parameter': parameter_name,
            'minimumRequired': minimum_required,
            'maximumPermissible': maximum_permissible,
            'provided': round(length, 2),
            'result': "-"  # 'Compliant' if length >= minimum_required else 'Non-Compliant'
            })
    
    
    # Structure the final output with table name
    final_output = {
        parameter_name+' Details': json_output
    }
    
    return final_output



def generate_height_report_misc(df: pd.DataFrame, color_and_pname: dict, table_name: str) -> list:
    # Prepare the JSON output list
    json_output = []
    for color in color_and_pname:
        # Filter the DataFrame based on Type == 'LINE' and Color == color
        filtered_df = df[(df['Type'] == 'LINE') & (df['Color'] == color)]
    
        # Create a dictionary with Layer as keys and Length as values
        layer_length_dict = filtered_df.groupby('Layer')['Length'].mean().to_dict()

        
    
    
        # Define constants for the report
        rules_table = 'N.A.' #BVR 69(1)'
        block_name = 'Single'
        minimum_required = 'N.A.' #2.60
        maximum_permissible = 'N.A.'
    
        # Populate the JSON output
        for layer, length in layer_length_dict.items():
            json_output.append({
                'rulesTable': rules_table,
                'blockName': block_name,
                'floorName': layer,
                'parameter': color_and_pname[color],
                'minimumRequired': minimum_required,
                'maximumPermissible': maximum_permissible,
                'provided': round(length, 2),
                'result': "-"  # 'Compliant' if length >= minimum_required else 'Non-Compliant'
                })
    
    
    # Structure the final output with table name
    final_output = {
        table_name+' Details': json_output
    }
    
    return final_output




def generate_gc_breakup_report(df, non_far_colors = [4,3,115,22,11], floor_layer='FLOOR-GROUND'):
    plot_area = 0
    report_data = []
    totals = {
        "plinthArea": 0,
        "plinthDeductibleArea": 0,
        "outerAllowableArea": 0,
        "outerNonAllowableArea": 0
    }
    
   
    # Filter the DataFrame for FLOOR-GROUND layer and Color 61 (for Plinth check)
    plinth_df = df[(df['Layer'] == floor_layer) & (df['Color'] == 61)]
    if not plinth_df.empty:
        plinth_value = "Single"
    else:
        plinth_value = ""
    #Get the plot area for GC calculation purpose

    plot_polygon_df = df[(df['Layer'] == floor_layer) & (df['Color'] == 7)]
    if not plot_polygon_df.empty:
        plot_area = plot_polygon_df.iloc[0]['Polygon Area']
    
    # Get the Polygon of Color 10 (for Plinth Area)
    plinth_polygon_df = df[(df['Layer'] == floor_layer) & (df['Color'] == 10)]
    if not plinth_polygon_df.empty:
        plinth_area = round(plinth_polygon_df.iloc[0]['Polygon Area'],3)
        totals['plinthArea'] = round(plinth_area,3)
    else:
        plinth_area = 0
    report_data.append({
                    "floorName": floor_layer,
                    "plinth": plinth_value,
                    "plinthArea": plinth_area,
                })

    # Filter for non-FAR objects based on the provided non_far_colors list
    non_far_df = df[(df['Layer'] == floor_layer) & (df['Type'] == 'LWPOLYLINE') & (df['Color'].isin(non_far_colors))]
    # Filter polygons inside/outside Plinth (Color 10) using Shapely Polygon containment
    for idx, non_far_row in non_far_df.iterrows():
        non_far_polygon = Polygon([(pt[0], pt[1]) for pt in non_far_row['Polyline points(x, y, bulge)']])
        non_far_text = non_far_row['Text'] if isinstance(non_far_row['Text'], list) and all(isinstance(item, str) for item in non_far_row['Text']) else None 
        non_far_area = round(non_far_row['Polygon Area'],3)

        if not plinth_polygon_df.empty:
            plinth_polygon = Polygon([(pt[0], pt[1]) for pt in plinth_polygon_df.iloc[0]['Polyline points(x, y, bulge)']])
            if plinth_polygon.contains(non_far_polygon):
                # Object Inside Plinth
                report_data.append({
                    "floorName": floor_layer,
                    "objectInPlinth": non_far_text,
                    "objectOutsidePlinth": "",
                    "plinthDeductibleArea": round(non_far_area,3),
                    "outerAllowableArea": "",
                    "outerNonAllowableArea": ""
                })
                totals['plinthDeductibleArea'] += non_far_area
            else:
                # Object Outside Plinth
                if non_far_area < 25:
                    allowable_area = non_far_area
                    non_allowable_area = 0
                else:
                    allowable_area = 0
                    non_allowable_area = non_far_area

                report_data.append({
                    "floorName": floor_layer,
                    "objectInPlinth": "",
                    "objectOutsidePlinth": non_far_text,
                    "plinthDeductibleArea": "",
                    "outerAllowableArea": allowable_area,
                    "outerNonAllowableArea": non_allowable_area
                })
                totals['outerAllowableArea'] += allowable_area
                totals['outerNonAllowableArea'] += non_allowable_area

    # Final Report Structure
    coverage_area = totals["plinthArea"] - totals["plinthDeductibleArea"] + totals['outerNonAllowableArea'] 
    coverage_perc = round(coverage_area/plot_area,2)*100
    report_json = {
        "data": report_data,
        "totals": totals,
        "coverageArea": coverage_area,
        "existingCoverage": None,  # Assuming 0 for this case
        "coveragePercentage": coverage_perc
    }

    return report_json



def check_provision_phy_challenged(df):
    layers = [
        'FLOOR-GROUND', 'FLOOR-STILT', 'FLOOR-PODIUM',
        'FLOOR-GROUND-EX', 'FLOOR-STILT-EX', 'FLOOR-PODIUM-EX'
    ]

    # Filter for polylines of color 52 in the target layers
    polylines = df[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Color'] == 52) &
        (df['Layer'].isin(layers))
    ]

    # Filter for text of color 52 in the same target layers
    text = df[
        (df['Type'] == 'TEXT') &
        (df['Color'] == 52) &
        (df['Layer'].isin(layers))
    ]

    # Check if both polylines and text are present
    count = len(polylines)  # Get the minimum count to ensure matching
    return count if count > 0 else None


def get_water_tank_height(df):
    # Filter the dataframe for polylines of color 4 in the FLOOR-TERRACE layer
    tanks = df[
        (df['Type'] == 'LWPOLYLINE') &
        (df['Color'] == 4) &
        (df['Layer'] == 'FLOOR-TERRACE')
    ]
    # Initialize an empty list to store the heights
    heights = []

    # Iterate over each tank instance
    for _, row in tanks.iterrows():
        # Get the corresponding text for this tank from the 'Text' column
        text_entries = row['Text']  # Assuming this column contains a list of text strings
        # Extract the height using regex pattern 'Height - X.XX'
        for text in text_entries:
            match = re.search(r'HEIGHT-([0-9]*\.[0-9]+)', text)
            if match:
                height = float(match.group(1))  # Extract and convert the height to float
                heights.append(height)
                break  # Stop after the first valid height is found for the tank

    # Return the list of heights or None if no tanks were found
    return heights if heights else None



def count_lifts(df):
    """
    This function counts the number of lifts by:
    1. Filtering for Type == 'LWPOLYLINE' and Color == 22.
    2. Checking the Text column for the keyword 'LIFT' (case-insensitive).
    3. Grouping by Layer and returning the count from the layer where the count is highest.
    """
    
    #Filter the DataFrame where Type == 'LWPOLYLINE' and Color == 22
    lift_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 22)]
    if lift_df.empty:
        return 0
    
    #Filter for rows where 'LIFT' is in the Text (case-insensitive)
    lift_df = lift_df[lift_df['Text'].apply(lambda x: any('LIFT' in t.upper() for t in x) if isinstance(x, list) else 'LIFT' in str(x).upper())]
    
    #Group by Layer and count the number of lifts in each layer
    lift_count_by_layer = lift_df.groupby('Layer').size()
    
    #If no lifts are found, return 0, otherwise return the max count from any layer
    if lift_count_by_layer.empty:
        return 0
    
    #Return the count from the layer with the maximum number of lifts
    return int(lift_count_by_layer.max())



def count_escalators(df):
    """
    This function counts the number of escalators by:
    1. Filtering for Type == 'LWPOLYLINE' and Color == 115.
    2. Checking the Text column for the keyword 'ESCALATOR' (case-insensitive).
    3. Grouping by Layer and returning the count from the layer where the count is highest.
    """
    
    #Filter the DataFrame where Type == 'LWPOLYLINE' and Color == 115
    escalator_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 115)]

    if escalator_df.empty:
        return 0
    
    #Filter for rows where 'ESCALATOR' is in the Text (case-insensitive)
    escalator_df = escalator_df[escalator_df['Text'].apply(lambda x: any('ESCALATOR' in t.upper() for t in x) if isinstance(x, list) else 'ESCALATOR' in str(x).upper())]
    
    #Group by Layer and count the number of escalators in each layer
    escalator_count_by_layer = escalator_df.groupby('Layer').size()
    
    #If no escalators are found, return 0, otherwise return the max count from any layer
    if escalator_count_by_layer.empty:
        return 0
    
    #Return the count from the layer with the maximum number of escalators
    return int(escalator_count_by_layer.max())



def count_moving_walks(df):
    """
    This function counts the number of moving walks by:
    1. Filtering for Type == 'LWPOLYLINE' and Color == 115.
    2. Checking the Text column for the keyword 'MOVING WALK' (case-insensitive).
    3. Grouping by Layer and returning the count from the layer where the count is highest.
    """
    
    # Filter the DataFrame where Type == 'LWPOLYLINE' and Color == 115
    moving_walk_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 115)]

    if moving_walk_df.empty:
        return 0
    
    # Filter for rows where 'MOVING WALK' is in the Text (case-insensitive)
    moving_walk_df = moving_walk_df[moving_walk_df['Text'].apply(lambda x: any('MOVING WALK' in t.upper() for t in x) if isinstance(x, list) else 'MOVING WALK' in str(x).upper())]
    
    # Group by Layer and count the number of moving walks in each layer
    moving_walk_count_by_layer = moving_walk_df.groupby('Layer').size()
    
    # If no moving walks are found, return 0, otherwise return the max count from any layer
    if moving_walk_count_by_layer.empty:
        return 0
    
    # Return the count from the layer with the maximum number of moving walks
    return int(moving_walk_count_by_layer.max())




def update_polygon_text(df, color_codes):
    # Dictionary for default text values based on color
    default_text_dict = {22: "Lift", 11: "Ventilation shaft"}

    # Filter DataFrame for polygons and text entities with colors in the specified list
    poly_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'].isin(color_codes))]
    text_df = df[(df['Type'] == 'TEXT') & (df['Color'].isin(color_codes))]

    # Iterate over each LWPOLYLINE polygon
    for poly_idx, poly_row in poly_df.iterrows():
        poly_points = poly_row['Polyline points(x, y, bulge)']
        polygon = Polygon([(x, y) for x, y, _ in poly_points])

        # Initialize a list to store texts contained within the polygon
        internal_texts = []

        # Check for text inside this polygon, in the same layer
        for text_idx, text_row in text_df.iterrows():
            if text_row['Layer'] == poly_row['Layer']:
                text_point = text_row['Text Insertion Point']
                point = Point(text_point[0], text_point[1])

                # If the point is inside the polygon, append the text to the list
                if polygon.contains(point):
                    internal_texts.append(text_row['Text'])

        # Update the LWPOLYLINE row with the list of texts (if any), otherwise use default value from the dictionary
        if len(internal_texts)<3 and len(internal_texts) != 0:
            df.at[poly_idx, 'Text'] = internal_texts
        else:
            # If no text is found, check if the polygon's color matches the default_text_dict
            polygon_color = poly_row['Color']
            if polygon_color in default_text_dict:
                df.at[poly_idx, 'Text'] = default_text_dict[polygon_color]

    return df



def map_balcony_to_building(df):
    result = []
    
    # Get unique layers in the dataframe
    unique_layers = df['Layer'].unique()
    
    for layer in unique_layers:
        # Filter polygons of color 181 (Building)
        df_building = df[(df['Layer'] == layer) & (df['Color'] == 181)]
        
        for index, building_row in df_building.iterrows():
            # Get the building polygon points and create a polygon
            building_points = building_row['Polyline points(x, y, bulge)']
            building_polygon = Polygon([(x, y) for x, y, bulge in building_points])
            building_coords = list(building_polygon.exterior.coords)  # Extract polygon coordinates
            
            # Filter polygons of color 35 (Balcony)
            df_balcony = df[(df['Layer'] == layer) & (df['Color'] == 35)]
            
            # Iterate over the sides (pairs of consecutive points) of the building polygon
            for i in range(len(building_coords) - 1):
                # Define the current side of the building as a line segment
                building_side = LineString([building_coords[i], building_coords[i+1]])
                building_length = building_side.length
                
                # Initialize a list to store lengths of all balcony sides close to this building side
                balcony_lengths = []
                
                # Loop through balcony polygons and check each side
                for idx, balcony_row in df_balcony.iterrows():
                    balcony_points = balcony_row['Polyline points(x, y, bulge)']
                    balcony_polygon = Polygon([(x, y) for x, y, bulge in balcony_points])
                    balcony_coords = list(balcony_polygon.exterior.coords)
                    
                    for j in range(len(balcony_coords) - 1):
                        # Define the current side of the balcony as a line segment
                        balcony_side = LineString([balcony_coords[j], balcony_coords[j+1]])
                        balcony_length = balcony_side.length
                        
                        # Check if the balcony side is within the distance threshold of 0 to 0.005 units
                        distance_to_building = building_side.distance(balcony_side)
                        if 0 <= distance_to_building <= 0.005 and balcony_length > 2:
                            balcony_lengths.append(balcony_length)
                
                # Only add the result if there are balconies with non-zero length
                if balcony_lengths:
                    # Sort balcony lengths and round them
                    sorted_balcony_lengths = [round(length, 2) for length in sorted(balcony_lengths, reverse=True)]
                    
                    # Add result to the final output
                    result.append({
                        "Block Name": "Single",  # Assuming block name, can be adjusted if available in the dataframe
                        "FloorName": layer,
                        "Building Length": round(building_length, 2),
                        "Balcony Lengths": sorted_balcony_lengths,  # List of all balcony lengths
                        "Result": "-",#"Compliant" if max(sorted_balcony_lengths) >= building_length else "Non-Compliant"
                    })

    return result

def check_prohibited_entities_and_exit(df):
    filtered_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'].isin([50, 61]))]
    message = f"This is a limited version and does not allow this kind of project plans, for more details contact admin."
    if not filtered_df.empty and len(filtered_df) > 1:
        print(message)  
        log_error.error(message)  
           



def calculate_polygon_width(polygon_points):
    if not polygon_points or isinstance(polygon_points, float):
        return 'N/A'

    x_coords = [point[0] for point in polygon_points if isinstance(point, tuple)]
    if not x_coords:
        return 'N/A'

    min_x = min(x_coords)
    max_x = max(x_coords)
    width = max_x - min_x
    
    return round(width, 2)

def calculate_polygon_height(polygon_points):
    if not polygon_points or isinstance(polygon_points, float):
        return 'N/A'

    y_coords = [point[1] for point in polygon_points if isinstance(point, tuple)]
    if not y_coords:
        return 'N/A'

    min_y = min(y_coords)
    max_y = max(y_coords)
    height = max_y - min_y
    
    return round(height, 2)

def calculate_polygon_length(polygon_points):
    if not polygon_points or isinstance(polygon_points, float):
        return 'N/A'

    length = 0
    for i in range(len(polygon_points) - 1):
        x1, y1 = polygon_points[i][0], polygon_points[i][1]
        x2, y2 = polygon_points[i + 1][0], polygon_points[i + 1][1]
        length += ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5
    
    return round(length, 2)

def get_combined_bathroom_wc(df, color_code):
    combined_bathroom_wc_df = df[df['Color'] == color_code]
    combined_wc_data = []

    for i, row in combined_bathroom_wc_df.iterrows():
        points = row['Polyline points(x, y, bulge)']
        width = calculate_polygon_width(points)
        area = row['Polygon Area']
        if width != 'N/A':
            combined_wc_data.append({
                'Area': round(area, 2),
                'Width': round(width, 2)
            })
    
    return combined_wc_data

def get_habitable_rooms(df, color_code, kitchen_area):
    habitable_room_df = df[df['Color'] == color_code]
    habitable_rooms_data = []
    habitable_count = 1

    for i, room in habitable_room_df.iterrows():

        points = room['Polyline points(x, y, bulge)']
        width = calculate_polygon_width(points)
        habitable_rooms_data.append({
            'Room Name': f'Habitable Room {habitable_count}',  # Increment room count for each unique room
            'Area': round(room['Polygon Area'], 2),
            'Width': round(width, 2) if width != 'N/A' else 'N/A'
        })
        habitable_count += 1  # Increment counter after processing each room
    
    return habitable_rooms_data


def get_kitchen_area_and_width(df, color_code):
    kitchen_area = 0
    kitchen_widths = []
    
    kitchen_polygons = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == color_code)]
    for _, poly_row in kitchen_polygons.iterrows():
        points = poly_row['Polyline points(x, y, bulge)']
        if points and isinstance(points, list):
            kitchen_area += poly_row['Polygon Area']
            width = calculate_polygon_width(points)
            if width != 'N/A':
                kitchen_widths.append(width)
    
    avg_kitchen_width = round(sum(kitchen_widths) / len(kitchen_widths), 2) if kitchen_widths else 'N/A'
    
    return round(kitchen_area, 2), avg_kitchen_width

def check_ventilation_compliance(habitable_rooms, min_ventilation_polygons):
    compliance = {}
    for room in habitable_rooms:
        room_name = room['Room Name']
        room_area = room['Area']
        for ventilation_poly in min_ventilation_polygons:
            ventilation_area = ventilation_poly['Polygon Area']
            if ventilation_area >= 0.1 * room_area:
                compliance[room_name] = "Compliant"
            else:
                compliance[room_name] = "Not Compliant"
    return compliance

def get_min_ventilation(df, color_code, habitable_rooms):
    min_ventilation_polygons = df[df['Color'] == color_code].to_dict(orient='records')
    return check_ventilation_compliance(habitable_rooms, min_ventilation_polygons)


min_max_values = {
    'combinedBathroomAndWCArea': {'min': 2.00, 'max': 'N.A.', 'section': 'BVR 71(2B)'},
    'combinedBathroomAndWCWidth': {'min': 1.10, 'max': 'N.A.', 'section': 'BVR 71(2B)'},
    'kitchenArea': {'min': 5.00, 'max': 'N.A.', 'section': 'BVR 70(2)'},
    'kitchenWidth': {'min': 1.80, 'max': 'N.A.', 'section': 'BVR 70(2)'},
    'habitableRoomArea1': {'min': 9.50, 'max': 'N.A.', 'section': 'BVR 69(3A)'},
    'habitableRoomWidth1': {'min': 2.40, 'max': 'N.A.', 'section': 'BVR 69(3A)'},
    'minVentilation': {'min': '10% of Room Area', 'max': 'N.A.', 'section': 'NBC/Vol-1/Part-3/Clause-20.1.1'}
}


def check_compliance(value, min_required, max_allowed=None):
    if max_allowed is None:
        return "compliant" if value >= min_required else "non-compliant"
    else:
        return "compliant" if min_required <= value <= max_allowed else "non-compliant"

def calculate_floor_wise_breakup(df):
    if 'Layer' not in df.columns:
        raise KeyError("'Layer' column is missing from DataFrame. Please check your data.")

    floor_types = df['Layer'].unique()
    floors = []

    color_codes = {
        'Combined Bathroom and WC': 81,
        'Habitable Room': 150,
        'Kitchen': 150,
        'Min Ventilation': 103
    }

    block_name = "Single"  # Assuming Block name, as per the image; change this accordingly

    for floor in floor_types:
        floor_df = df[df['Layer'] == floor]
        if not any(color in floor_df['Color'].values for color in color_codes.values()):
            continue

        # Process each floor and add results as rows in a list
        floor_result = []

        # Combined Bathroom and WC
        combined_wc_data = get_combined_bathroom_wc(floor_df, color_codes['Combined Bathroom and WC'])
        for idx, wc_data in enumerate(combined_wc_data, start=1):
            wc_compliance_area = check_compliance(
                wc_data['Area'], 
                min_max_values['combinedBathroomAndWCArea']['min']
            )
            wc_compliance_width = check_compliance(
                wc_data['Width'], 
                min_max_values['combinedBathroomAndWCWidth']['min']
            )
            floor_result.append({
                'blockName': block_name,
                'floorName': floor,
                'section': min_max_values['combinedBathroomAndWCArea']['section'],
                'parameter': f'Combined Bathroom and WC Area {idx}',
                'minRequired': min_max_values['combinedBathroomAndWCArea']['min'],
                'maxPermissible': min_max_values['combinedBathroomAndWCArea']['max'],
                'provided': wc_data['Area'],
                'result': wc_compliance_area
            })
            floor_result.append({
                'blockName': block_name,
                'floorName': floor,
                'section': min_max_values['combinedBathroomAndWCWidth']['section'],
                'parameter': f'Combined Bathroom and WC Width {idx}',
                'minRequired': min_max_values['combinedBathroomAndWCWidth']['min'],
                'maxPermissible': min_max_values['combinedBathroomAndWCWidth']['max'],
                'provided': wc_data['Width'],
                'result': wc_compliance_width
            })

        # Kitchen
        kitchen_area, kitchen_width = get_kitchen_area_and_width(floor_df, color_codes['Kitchen'])
        kitchen_compliance_area = check_compliance(
            kitchen_area, 
            min_max_values['kitchenArea']['min']
        )
        kitchen_compliance_width = check_compliance(
            kitchen_width, 
            min_max_values['kitchenWidth']['min']
        )
        floor_result.append({
            'blockName': block_name,
            'floorName': floor,
            'section': min_max_values['kitchenArea']['section'],
            'parameter': 'Kitchen Area',
            'minRequired': min_max_values['kitchenArea']['min'],
            'maxPermissible': min_max_values['kitchenArea']['max'],
            'provided': kitchen_area,
            'result': kitchen_compliance_area
        })
        floor_result.append({
            'blockName': block_name,
            'floorName': floor,
            'section': min_max_values['kitchenWidth']['section'],
            'parameter': 'Kitchen Width',
            'minRequired': min_max_values['kitchenWidth']['min'],
            'maxPermissible': min_max_values['kitchenWidth']['max'],
            'provided': kitchen_width,
            'result': kitchen_compliance_width
        })

        # Habitable Rooms
        habitable_rooms_data = get_habitable_rooms(floor_df, color_codes['Habitable Room'], kitchen_area)
        for room in habitable_rooms_data:
            room_compliance_area = check_compliance(
                room['Area'], 
                min_max_values['habitableRoomArea1']['min']
            )
            room_compliance_width = check_compliance(
                room['Width'], 
                min_max_values['habitableRoomWidth1']['min']
            )
            floor_result.append({
                'blockName': block_name,
                'floorName': floor,
                'section': min_max_values['habitableRoomArea1']['section'],
                'parameter': f'Habitable Room Area {room["Room Name"]}',
                'minRequired': min_max_values['habitableRoomArea1']['min'],
                'maxPermissible': min_max_values['habitableRoomArea1']['max'],
                'provided': room['Area'],
                'result': room_compliance_area
            })
            floor_result.append({
                'blockName': block_name,
                'floorName': floor,
                'section': min_max_values['habitableRoomWidth1']['section'],
                'parameter': f'Habitable Room Width {room["Room Name"]}',
                'minRequired': min_max_values['habitableRoomWidth1']['min'],
                'maxPermissible': min_max_values['habitableRoomWidth1']['max'],
                'provided': room['Width'],
                'result': room_compliance_width
            })

        # Min Ventilation Compliance
        min_ventilation_compliance = get_min_ventilation(floor_df, color_codes['Min Ventilation'], habitable_rooms_data)
        for room_name, compliance in min_ventilation_compliance.items():
            floor_result.append({
                'blockName': block_name,
                'floorName': floor,
                'section': min_max_values['minVentilation']['section'],
                'parameter': f'Min Ventilation for {room_name}',
                'minRequired': min_max_values['minVentilation']['min'],
                'maxPermissible': min_max_values['minVentilation']['max'],
                'provided': 'compliant' if compliance == 'compliant' else 'non-compliant',
                'result': 'compliant' if compliance == 'compliant' else 'non-compliant'
            })

        # Add the floor result to the floors list
        floors.extend(floor_result)
    
    return floors


def identify_floor(layer):
    floors = ['FLOOR01', 'FLOOR02', 'FLOOR03', 'FLOOR-BF1', 'FLOOR-GROUND', 'FLOOR-TERRACE']
    for floor in floors:
        if floor in layer:
            return floor
    return None

def extract_staircase_data(df):
    staircase_df = df[(df['Type'] == 'TEXT') & (df['Color'] == 115)]
    
    staircase_name_data = {}
    width_data = {}
    tread_riser_data = {}
    handrail_data = {}

    for _, row in staircase_df.iterrows():
        width, tread, riser = extract_staircase_details_from_text(row['Text'])
        floor_name = row['Layer']
        
        # Extract staircase name
        staircase_name = extract_staircase_name_from_text(row['Text'])
        
        
        if width is not None:
            width_data[floor_name] = width

        if staircase_name is not None:
            staircase_name_data[floor_name] = staircase_name

        if floor_name not in tread_riser_data:
            tread_riser_data[floor_name] = {'Staircase Tread': None, 'Staircase Riser': None}

        if tread is not None:
            tread_riser_data[floor_name]['Staircase Tread'] = tread
        if riser is not None:
            tread_riser_data[floor_name]['Staircase Riser'] = riser
        
        handrail_height = extract_handrail_height_from_text(row['Text'])
        if handrail_height is not None:
            handrail_data[floor_name] = handrail_height
    

    landing_width_data = extract_landing_width_from_polygons(df)
    df_width = pd.DataFrame(list(width_data.items()), columns=['Floor Name', 'Staircase Width'])
    df_width['Staircase Name'] = df_width['Floor Name'].map(staircase_name_data)  # Add staircase names
    df_width['Staircase Landing Width'] = df_width['Floor Name'].map(landing_width_data)
    df_width.set_index('Floor Name', inplace=True)

    df_tread_riser = pd.DataFrame.from_dict(tread_riser_data, orient='index') 
    df_tread_riser.index.name = 'Floor Name'
    df_tread_riser['Staircase Name'] = df_tread_riser.index.map(staircase_name_data)
    
    df_handrail = pd.DataFrame(list(handrail_data.items()), columns=['Floor Name', 'Handrail Height'])
    df_handrail['Staircase Name'] = df_handrail['Floor Name'].map(staircase_name_data)
    df_handrail.set_index('Floor Name', inplace=True)
    

    return df_width, df_tread_riser, df_handrail

def extract_staircase_details_from_text(text):
    try:
        width = None
        tread = None
        riser = None
        
        text_upper = text.upper()

        if 'WIDTH' in text_upper:
            width_str = text_upper.split('WIDTH -')[-1].strip().split()[0]
            width = float(width_str)
        
        if 'TREAD' in text_upper:
            tread_str = text_upper.split('TREAD -')[-1].strip().split()[0]
            tread = float(tread_str)
        
        if 'RISER' in text_upper:
            riser_str = text_upper.split('RISER -')[-1].strip().split()[0]
            riser = float(riser_str)

        return width, tread, riser
    except (ValueError, IndexError) as e:
        log_error(f"Error parsing staircase data from text: {text} - {e}")
        return None, None, None

def extract_staircase_name_from_text(text):
    import re
    match = re.search(r'STAIR-(\d+)', text.upper())
    if match:
        return f"Staircase {match.group(1)}"
    return None

def extract_handrail_height_from_text(text):
    try:
        text_upper = text.upper()
        if 'HANDRAIL' in text_upper:
            height_str = text_upper.split('HANDRAIL -')[-1].strip().split()[0]
            return float(height_str)
        return None
    except (ValueError, IndexError) as e:
        log_error(f"Error parsing handrail height from text: {text} - {e}")
        return None

def get_polygon_dimensions(df, layer, color):
    """
    Filters the DataFrame based on the specified layer and color, then calculates
    the bounding box dimensions (width and length) of all polygons in the filtered data.
    Returns two dictionaries: one for polygon names with their widths, and another for polygon names
    with their lengths.

    Args:
        df (pd.DataFrame): The DataFrame containing polygon data.
        layer (str): The layer to filter polygons.
        color (int): The color to filter polygons.

    Returns:
        tuple: Two dictionaries, one with polygon names and their widths,
               and another with polygon names and their lengths.
    """
    
    # Filter the dataframe based on layer and color
    filtered_df = df[(df['Layer'] == layer) & (df['Type'] == 'LWPOLYLINE') & (df['Color'] == color)]
    
    # Initialize dictionaries to store polygon names with their widths and lengths
    polygon_widths = {}
    polygon_lengths = {}
    
    # Function to calculate the Euclidean distance between two points
    def distance(point1, point2):
        return np.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2)
    
    # Iterate through each polygon in the filtered dataframe
    for index, row in filtered_df.iterrows():
        # Extract the polyline points from the row
        polygon_points = row.get('Vertices', None)

        if polygon_points is None or not isinstance(polygon_points, list):
            #print(f"Skipping polygon at index {index} with invalid or missing 'Vertices' data.")
            continue
        
        # Extract only the (x, y) coordinates, ignoring the bulge value
        try:
            vertices = [(x, y) for x, y, bulge in polygon_points]
        except ValueError:
            #print(f"Skipping polygon at index {index} due to ValueError while extracting vertices.")
            continue
        
        if len(vertices) < 3:  # A polygon should have at least 3 vertices
            #print(f"Skipping polygon at index {index} due to insufficient number of vertices.")
            continue
        
        
        xs, ys = zip(*vertices)
        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)
        
        width = max_x - min_x
        length = max_y - min_y
        
        
        polygon_name = f"Polygon-{index}"
        
        polygon_widths[polygon_name] = round(width, 2)
        polygon_lengths[polygon_name] = round(length, 2)

        print(f"Polygon index {index}: Width = {polygon_widths[polygon_name]}, Length = {polygon_lengths[polygon_name]}")

    return polygon_widths, polygon_lengths

def extract_riser_count_per_flight(df):
    # Filter lines with color code 191 and staircase polygons with color code 115
    lines_color_191 = df[(df['Type'] == 'LINE') & (df['Color'] == 191)]
    staircase_polygons_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 115)]

    riser_count_data = {}

    # print(f"Found {len(lines_color_191)} lines with color code 191.")
    # print(f"Found {len(staircase_polygons_df)} staircase polygons.")

    for _, stair_row in staircase_polygons_df.iterrows():
        vertices_with_bulge = stair_row['Polyline points(x, y, bulge)']
        staircase_Polygon_vertices = [(x,y) for x,y,bulge in vertices_with_bulge]
        floor_name = stair_row['Layer']

        if staircase_Polygon_vertices is None:
            print(f"Skipping staircase polygon with None vertices for floor {floor_name}.")
            continue

        staircase_polygon = Polygon(staircase_Polygon_vertices)

        # Count lines with color code 191 inside this staircase polygon
        count = 1
        just_count = 0
        for _, line_row in lines_color_191.iterrows():
            just_count += 1
            start_point = line_row['StartPoint']
            end_point = line_row['EndPoint']
            
            line = LineString([start_point, end_point])
            
            if staircase_polygon.contains(line):
                count += 1
        
        riser_count_data[floor_name] = count
        
    
    return riser_count_data

def extract_landing_width_from_polygons(df):
    """
    Filters the DataFrame based on the specified layer and color, then calculates
    the landing widths for all staircase polygons in the filtered data.
    Returns a dictionary with floor names and their corresponding landing widths.

    Args:
        df (pd.DataFrame): The DataFrame containing polygon data.

    Returns:
        dict: A dictionary with floor names and their landing widths.
    """

    # Define the color code for staircase landing width polygons
    color_code = 223  
    # Filter the dataframe based on the staircase landing width color
    filtered_df = df[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == color_code)]
    
    landing_widths = {}
    
    
    for index, row in filtered_df.iterrows():
        
        vertices_with_bulge = row['Polyline points(x, y, bulge)']
        staircase_Polygon_vertices = [(x,y) for x,y,bulge in vertices_with_bulge]
        floor_name = row['Layer']

        if staircase_Polygon_vertices is None or not isinstance(staircase_Polygon_vertices, list):
            print(f"Skipping polygon at index {index} with invalid or missing 'Vertices' data.")
            continue
        
        
        if len(staircase_Polygon_vertices) < 3:  
            print(f"Skipping polygon at index {index} due to insufficient number of vertices.")
            continue
        
        floor_wise_l_width = calculate_polygon_width(staircase_Polygon_vertices)
        

        landing_widths[floor_name] = floor_wise_l_width

    return landing_widths

def calculate_polygon_width(polygon_points):
    if not polygon_points or isinstance(polygon_points, float):
        return 'N/A'

    x_coords = [point[0] for point in polygon_points if isinstance(point, tuple)]
    if not x_coords:
        return 'N/A'

    min_x = min(x_coords)
    max_x = max(x_coords)
    width = max_x - min_x
    
    return round(width, 2)  



def get_stair_details(df):
    # Extract data
    df_width, df_tread_riser, df_handrail = extract_staircase_data(df)
    df_riser_count = extract_riser_count_per_flight(df)
    landing_widths = extract_landing_width_from_polygons(df)

    # Helper function to check compliance
    def check_compliance(provided, min_required, max_allowed=None):
        if max_allowed is not None:
            return "compliant" if min_required <= provided <= max_allowed else "non-compliant"
        else:
            return "compliant" if provided >= min_required else "non-compliant"

    # Create structured output for JSON format
    stair_details_output = {
        "staircaseDetailsWidth": [],
        "staircaseDetailsTreadRiser": [],
        "riserCountPerFlight": [],
        "handrailDetails": []
    }

    # For the "Staircase Details (Width)" table
    for floor_name, row in df_width.iterrows():
        stair_details_output["staircaseDetailsWidth"].append({
            "blockName": "Single",
            "floorName": floor_name,
            "staircaseName": row['Staircase Name'], 
            "minimumStaircaseWidthRequired": 1.85,  # Example value, 
            "staircaseWidthProvided": row["Staircase Width"],
            "staircaseWidthResult": check_compliance(row["Staircase Width"], 1.85),
            "minimumStaircaseLandingWidthRequired": 0.75,  # Example value, 
            "staircaseLandingWidthProvided": row["Staircase Landing Width"],
            "staircaseLandingWidthResult": check_compliance(row["Staircase Landing Width"], 0.75)
        })

    # For the "Staircase Details (Tread and Riser)" table
    for floor_name, row in df_tread_riser.iterrows():
        stair_details_output["staircaseDetailsTreadRiser"].append({
            "blockName": "Single",
            "floorName": floor_name,
            "staircaseName": row['Staircase Name'],
            "minimumTreadRequired": 0.25,  # Example value, 
            "treadProvided": row["Staircase Tread"],
            "treadResult": check_compliance(row["Staircase Tread"], 0.25),
            "maximumRiserAllowable": 0.17,  # Example value, 
            "riserProvided": row["Staircase Riser"],
            "riserResult": check_compliance(row["Staircase Riser"], 0.0, 0.17)  # Assuming 0 is the minimum
        })

    # For the "Riser Count per Flight" table
    for floor_name, riser_count in df_riser_count.items():
        stair_details_output["riserCountPerFlight"].append({
            "blockName": "Single",
            "floorName": floor_name,
            "staircaseName": row['Staircase Name'],
            "maximumRequired": 15,  # Example value, 
            "provided": riser_count,
            "result": check_compliance(riser_count, 1, 15)  # Assuming a minimum of 1 step
        })

    # For the "Handrail Details" table
    for floor_name, row in df_handrail.iterrows():
        stair_details_output["handrailDetails"].append({
            "blockName": "Single",
            "floorName": floor_name,
            "staircaseName": row['Staircase Name'],
            "minimumHandrailHeightRequired": 1.00,  # Example value,
            "maximumHandrailHeightAllowable": 1.20,  # Example value, 
            "handrailHeightProvided": row["Handrail Height"],
            "result": check_compliance(row["Handrail Height"], 1.00, 1.20)
        })

    return stair_details_output


def get_minimum_lphd(build_usage):
    min_lphd = 0
    if build_usage == "RESIDENTIAL":
        min_lphd  = 100
    return min_lphd
def calculate_watertanka_volume(df):

    # Filter for water tank polygons on the FLOOR-TERRACE layer with the appropriate properties
    df_watertank = df[(df['Layer'] == 'FLOOR-TERRACE') & 
                      (df['Type'] == 'LWPOLYLINE') & 
                      (df['Color'] == 4) ]
    
    
    provided_volume = 0  # Initialize provided volume
    
    for index, row in df_watertank.iterrows():
    # Extract height from the text (assuming the format 'Height - <value>')
        height_texts = [text for text in row['Text'] if 'height' in text.lower()]  # Use lower() for case insensitivity
        if height_texts:
            # Use regular expression to extract the numeric height value
            height_match = re.search(r'height\s*-\s*([\d.]+)', height_texts[0].lower())  # Convert to lower case for matching
        if height_match:
            height = float(height_match.group(1))  # Convert height to float
            area = row['Polygon Area']  # Get the area value from the same row
            volume = height * area  # Calculate the volume
            
            provided_volume += volume  
    
    # Hardcoded values for the occupant load until bvn data got available from db 
    min_lphd = get_minimum_lphd("RESIDENTIAL")
    occupant_load = 12
    required_volume = occupant_load * min_lphd  

    

    # Generate the JSON structure for the table
    table_data = {
        "WaterTankCalculation": [
            {
                "rulesTable": "NBC VOL-2 Part-9 Section-1 Clause-4.1",
                "buildingUsage": "RESIDENTIAL",
                "occupantLoad": occupant_load,
                "minimumLPHD": 100.00,
                "required": required_volume,
                "provided": round(provided_volume, 2),  # Rounded provided volume, 
                "result": "-"
            },
            {
                "rulesTable": "-",
                "buildingUsage": "Total",
                "occupantLoad": "-",
                "minimumLPHD": "-",
                "required": required_volume,
                "provided": round(provided_volume, 2),  # Rounded provided volume
                "result": "Compliant" if provided_volume >= required_volume else "Non-Compliant"
            }
        ]
    }

    return table_data

def min_lphd_watertank(build_type):
    min_lphd = 0
    if build_type == "RESIDENTIAL":
        min_lphd = 100
    
    return min_lphd
def get_water_tank_details(df, occupant_load, build_type):
    water_tank_details = {}
    total_provided_vol = 0
    

    min_lphd = get_minimum_lphd(build_type)
    required_volume = occupant_load*min_lphd if min_lphd > 0 else "Invalid"
    
    water_tank_df = df.loc[
        (df['Layer'].isin(['FLOOR-GROUND', 'FLOOR-TERRACE'])) & 
        (df['Type'] == 'LWPOLYLINE') & 
        (df['Color'] == 4)  
    ]
    if water_tank_df.empty:
        return {'Water Tank': 'Not Provided'}
    
    table_data = {
        "WaterTankCalculation": []
    }

    for i, polygon_row in water_tank_df.iterrows():
        # Get the polyline points and extract x, y coordinates
        polyline_points = polygon_row['Polyline points(x, y, bulge)']
        polygon_coords = [(point[0], point[1]) for point in polyline_points if len(point) >= 2]
        polygon = Polygon(polygon_coords)  
        
        # Check the corresponding 'Text' field in the same row for Water Tank data
        text_data = polygon_row['Text']  
        # Check if "Water Tank" is mentioned in the text
        if not any("water tank" in text.lower() for text in text_data):
            print(f"Skipping water tank at index {i}: No 'Water Tank' text found.")
            continue
        
        # "HEIGHT - x.xx" part from the text and extract the height value
        height_text = next((text for text in text_data if "HEIGHT" in text), None)
        if height_text:
            # Extract the height value using regex
            match = re.search(r'HEIGHT\s*-\s*(\d+(\.\d+)?)', height_text)
            if match:
                height = float(match.group(1)) 
            else:
                print(f"Skipping water tank at index {i}: Invalid height format in '{height_text}'.")
                continue
        else:
            print(f"Skipping water tank at index {i}: No 'HEIGHT' text found.")
            continue
        
        # Calculate volume (assuming water tank volume is polygon area * height)
        volume = polygon.area * height
        
        # Create a unique key for each water tank
        water_tank_key = f"Water Tank {i + 1}"

        # Store the water tank details
        water_tank_details[water_tank_key] = {
            "Water Tank Volume": round(volume, 2),
            "Water Tank Area": round(polygon.area, 2),
            "Water Tank Height": height
        }
        
        water_tank_entry = {
            "Rules/Table": "NBC VOL-2 Part-9 Section-1 Clause-4.1",
            "BuildingUsage": build_type,
            "OccupantLoad": occupant_load,
            "MinimumLPHD": min_lphd,
            "Required(L)": "-",
            "Provided(L)": round(volume * 1000, 2),  # Convert to liters
            "Result": "-"
        }
        
        # Add the water tank details to the list
        table_data["WaterTankCalculation"].append(water_tank_entry)
        
        # Calculate provided volume in liters and add to the total
        provided_vol = round(volume * 1000, 2)
        total_provided_vol += provided_vol
    # Add a summary entry for total provided volume
    total_entry = {
        "Rules/Table": "Total",
        "BuildingUsage": build_type,
        "OccupantLoad": "-",
        "MinimumLPHD": "-",
        "Required(L)": required_volume,
        "Provided(L)": total_provided_vol,
        "Result": "Compliant" if total_provided_vol >= required_volume else "Non-Compliant"
    }
    
    table_data["WaterTankCalculation"].append(total_entry)


    # Return the result in JSON format with proper indentation for readability
    return table_data

def building_general_details(df):
    # 1. Total number of floors
    unique_floors = df['Layer'].unique()
    total_floors = len([floor for floor in unique_floors if floor not in ["0", "def Points"]]) - 1

    # 2. Block height
    block_height = df[(df['Layer'] == 'FLOOR-GROUND') & (df['Type'] == 'LINE') & (df['Color'] == 151)]['Length'].sum()

    # 3. Total builtup area
    total_builtup_area = df[df['Color'].isin([181, 35, 4, 5, 6])]['Polygon Area'].sum()

    # 4. Non FAR Area
    non_far_area = df[df['Color'].isin([115, 22, 35, 51])]['Polygon Area'].sum()

    # 5. Builtup (FAR) Area
    builtup_far_area = total_builtup_area - non_far_area

    # 6. Total Proposed FAR Area
    total_proposed_far_area = builtup_far_area

    # Create the JSON structure
    building_details = [
        {
            "blockName": "Single",
            "totalNumberofFloors": f"{total_floors} Floors",
            "blockHeight": block_height,
            "totalBuiltupArea": round(total_builtup_area, 3),
            "nonFARArea": round(non_far_area, 3),
            "builtup(FAR)Area": round(builtup_far_area, 3),
        },
        {
            "blockName": "Total",
            "totalNumberofFloors": "",
            "blockHeight": "",
            "totalBuiltupArea": round(total_builtup_area, 3),
            "nonFARArea": round(non_far_area, 3),
            "builtup(FAR)Area": round(builtup_far_area, 3),
        },
        {
            "blockName": "Total Proposed FAR Area",
            "totalNumberofFloors": "",
            "blockHeight": "",
            "totalBuiltupArea": "",
            "nonFARArea": "",
            "builtup(FAR)Area": round(total_proposed_far_area, 3),
        }
    ]

    return building_details



def process_non_far_objects(df):
    # Define a mapping from color codes to non FAR object names
    color_to_object_name = {
        4: 'WATER TANK/GARAGE',
        22: 'LIFT',
        35: 'BALCONY',
        51: 'CORRIDOR',
        115: 'STAIRCASE',
        107: 'Ramp',
        140: 'Car Parking',
        # Add other color mappings as needed
    }
    
    non_far_objects = {}
    
    # Process the DataFrame to populate the non_far_objects dictionary
    for _, row in df.iterrows():
        block = 'Single'  # Assuming 'Single' as the block name
        floor = row['Layer']
        color = row['Color']
        area = row['Polygon Area']
        
        if color in color_to_object_name and row['Type'] == 'LWPOLYLINE':
            object_name = row["Text"][0] if row["Color"] == 4 else  color_to_object_name[color]
            if block not in non_far_objects:
                non_far_objects[block] = {}
            if floor not in non_far_objects[block]:
                non_far_objects[block][floor] = []
            non_far_objects[block][floor].append((object_name, area))
    
    return non_far_objects

def create_non_far_json_table(df):
    non_far_objects_data = process_non_far_objects(df)
    
    def get_block_names():
        return ['Single']

    def get_floors(block):
        floor_order = ['FLOOR-BF1', 'FLOOR-BF2', 'FLOOR-GROUND', 'FLOOR01', 'FLOOR02', 'FLOOR03', 'FLOOR04', 'FLOOR05', 'FLOOR-TERRACE']
        floors = list(non_far_objects_data.get(block, {}).keys())
        sorted_floors = sorted(floors, key=lambda x: floor_order.index(x) if x in floor_order else len(floor_order))
        return sorted_floors

    def get_non_far_objects(block, floor):
        return non_far_objects_data.get(block, {}).get(floor, [])

    def calculate_total(non_far_objects):
        return sum(area for name, area in non_far_objects) 

    blocks = get_block_names()
    table = []
    
    for block in blocks:
        floors = get_floors(block)
        block_data = {
            'blockName': block,
            'floors': []
        }
        for floor in floors:
            non_far_objects = get_non_far_objects(block, floor)
            floor_data = {
                'typicalFloorName': floor,
                'nonFARObjects': [
                    {'nonFARName': name, 'nonFARArea': round(area,3)} for name, area in non_far_objects
                ],
                'totalNonFARArea': round(calculate_total(non_far_objects), 3)
            }
            block_data['floors'].append(floor_data)
        table.append(block_data)
    
    return table


def floor_wise_breakup_json(df):
    # Extract unique floor names from the 'Layer' column in the dataframe
    floor_names = df['Layer'].unique()

    # Unwanted floor names
    ignore_floors_in_df = ['0', 'def points']

    # Filter the predefined list to include only those floor names that are present in the dataframe
    filtered_floors = [floor for floor in floor_names if floor not in ignore_floors_in_df]

    # Initialize a list to store floor data
    floors = []

    # Process the data for floor-wise breakup
    for floor_name in filtered_floors:
        floor_data = df[df['Layer'] == floor_name]
        if floor_name in ['FLOOR-BF1', 'FLOOR-BF2']:
            total_area = floor_data[floor_data['Color'] == 5]['Polygon Area'].sum()
        elif floor_name == 'FLOOR-TERRACE':
            total_area = floor_data[floor_data['Color'] == 4]['Polygon Area'].sum()
        else:
            total_area = floor_data[floor_data['Color'].isin([181, 35, 6])]['Polygon Area'].sum()

        non_far_area = floor_data[floor_data['Color'].isin([115, 22, 35, 51])]['Polygon Area'].sum()
        residential_area = total_area - non_far_area
        commercial_area = floor_data[floor_data['Color'] == 6]['Polygon Area'].sum() - non_far_area if floor_data[floor_data['Color'] == 6]['Polygon Area'].sum() > 0 else 0
        deduction_area = floor_data[floor_data['Color'] == 11]['Polygon Area'].sum()

        # Append the floor data to the floors list
        floors.append({
            "floorName": floor_name,
            "totalArea": round(total_area, 3),
            "deduction": round(deduction_area, 3),
            "notCountedInFARArea": round(non_far_area, 3),
            "residential": round(residential_area, 3),
            "commercial": round(commercial_area, 3),
            "industrial": 0,  # Assuming no industrial area
            "institutional": 0,  # Assuming no institutional area
            "educational": 0  # Assuming no educational area
        })

   #JSON structure with block as a key and floors as a list
    block_structure = [
        {
            "blockName": "Single",
            "floors": floors  # Floors list added here
        }
    ]

    
    return block_structure


# function to compare input and extracted values
def compare_values(given, extracted, is_percentage=False):
    if given == "N/A" or extracted == "N/A":
        return {"difference": "N/A", "result": "Compliant" if given == extracted else "Non-compliant"}
    
    if isinstance(given, (int, float)) and isinstance(extracted, (int, float)):
        difference = extracted - given
        return {
            "difference": round((difference / given) * 100, 2) if is_percentage and given != 0 else difference,
            "result": "Compliant" if difference == 0 else "Non-compliant"
        }
    
    return {"difference": 0, "result": "Compliant" if given == extracted else "Non-compliant"}

# Function to generate the comparison table as a JSON structure
def generate_comparison_table_json(df):
    user_number_of_floor = None
    user_building_height = None
    user_proposed_builtup_area = None
    user_gross_plot_area = None
    user_phy_challenged = None
    user_type_of_construction = None

    drw_number_of_floors = int(get_floor_count(df))
    drw_building_height = get_building_height(df)
    drw_proposed_builtup_area = get_proposed_builtup_area(df)
    drw_gross_plot_area = get_gross_plot_area(df)
    drw_phy_challenged = check_provision_phy_challenged(df)
    drw_type_of_construction = None
    table_data = [
        {"userInputParameter": "No. of Floors", "givenAsInput": user_number_of_floor, "extractedFromDrawing": drw_number_of_floors, "isPercentage": False},
        {"userInputParameter": "Building Height", "givenAsInput": user_building_height, "extractedFromDrawing": drw_building_height, "isPercentage": False},
        {"userInputParameter": "Proposed Builtup Area", "givenAsInput": user_proposed_builtup_area, "extractedFromDrawing": drw_proposed_builtup_area, "isPercentage": True},
        {"userInputParameter": "Gross Plot Area", "givenAsInput":  user_gross_plot_area, "extractedFromDrawing": drw_gross_plot_area, "isPercentage": True},
        {"userInputParameter": "Provision for physically challenged persons", "givenAsInput": drw_phy_challenged, "extractedFromDrawing": drw_phy_challenged, "isPercentage": False},
        {"userInputParameter": "Type of Construction", "givenAsInput": user_type_of_construction, "extractedFromDrawing": drw_type_of_construction, "isPercentage": False} 
   ]
    result_data = {"comparisonTable": [
        {
            "userInputParameter": entry["userInputParameter"],
            "givenAsInput": entry["givenAsInput"],
            "extractedFromDrawing": entry["extractedFromDrawing"],
            ("differenceInNumber" if not entry["isPercentage"] else "differenceInPercentage"): (comparison := compare_values(entry["givenAsInput"], entry["extractedFromDrawing"], entry["isPercentage"]))["difference"],
            "result": comparison["result"]
        } for entry in table_data
        
    ]}

    return result_data


# Rule dictionary to hold minimum, maximum, colony cell values, and sections
rule_data = {
    "Building Height": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Net Plot Area": {"section": None, "min": None, "max": None, "colony_cell": None},
    "FAR": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Ground Coverage (In Percentage)": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Road Width": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Frontage of Plot": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Front Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Side1 Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Side2 Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Rear Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Basement Front Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Basement Side1 Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Basement Side2 Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
    "Basement Rear Open Space": {"section": None, "min": None, "max": None, "colony_cell": None},
}

# Function to determine compliance based on provided, min, max, and colony cell values
def determine_compliance(provided_value, min_value, max_value, colony_cell):
    # Handle None values in min_value, max_value, and colony_cell
    compliance_result = "Compliant"

    # If min_value is not None, check if provided_value is greater than or equal to min_value
    if min_value is not None:
        if provided_value is None or provided_value < min_value:
            compliance_result = "Non-compliant"
    
    # If max_value is not None, check if provided_value is less than or equal to max_value
    if max_value is not None:
        if provided_value is None or provided_value > max_value:
            compliance_result = "Non-compliant"

    # Optionally check colony cell values if applicable (this is dependent on your logic)
    if colony_cell is not None:
        # Additional colony-specific compliance logic here if needed
        pass

    # Return a tuple of (provided_value, compliance result)
    return provided_value, compliance_result

# Main function to generate JSON structure for the table
def generate_dynamic_cr_mp_bvn_table_json(df):
    # Fetch basement values using the provided dataframe
    basement_mos = get_basement_mos(df)

    # Initial set of rows for standard parameters
    table_data = [
        {"parameter": "Building Height", "provided": get_building_height(df)},
        {"parameter": "Net Plot Area", "provided": get_net_plot_area(df)},
        {"parameter": "FAR", "provided": get_calculated_far(df)},
        {"parameter": "Ground Coverage (In Percentage)", "provided": get_calculated_gc_percentage(df)},
        {"parameter": "Road Width", "provided": get_road_width(df)},
        {"parameter": "Frontage of Plot", "provided": round(get_frontage_of_plot(df), 2)},
        {"parameter": "Front Open Space", "provided": find_closest_distance(df,"FLOOR-GROUND",4,10)},
        {"parameter": "Side1 Open Space", "provided": find_closest_distance(df,"FLOOR-GROUND",6,10)},
        {"parameter": "Side2 Open Space", "provided": find_closest_distance(df,"FLOOR-GROUND",2,10)},
        {"parameter": "Rear Open Space", "provided": find_closest_distance(df,"FLOOR-GROUND",3,10)}
    ]

    # Generate the final table data with compliance checking
    result_data = {"comparisonTable": [
        {
            "section": rule_data[entry["parameter"]]["section"],
            "parameter": entry["parameter"],
            "minimumRequired": rule_data[entry["parameter"]]["min"],
            "maximumPermissible": rule_data[entry["parameter"]]["max"],
            "requiredValuesAsPerColonyRules": rule_data[entry["parameter"]]["colony_cell"],
            "provided": (provided_val := determine_compliance(
                entry["provided"], 
                rule_data[entry["parameter"]]["min"], 
                rule_data[entry["parameter"]]["max"], 
                rule_data[entry["parameter"]]["colony_cell"]
            ))[0],
            "result": provided_val[1]
        } for entry in table_data
    ]}

    # Dynamically add basement MOS values (if they exist)
    for key, value in basement_mos.items():
        if value not in ["N.A.", None]:  # Add only valid basement values
            result_data["comparisonTable"].append({"parameter": key, "provided": value})

    return result_data

# Rule Dictionary
primary_p_rule_data = {
    "Area of Road widening": {"section": None, "min": None, "max": None, "provided": None},
    "Site Area Requirement for Service Floor": {"section": None, "min": None, "max": None, "provided": None},
    "Site Area Requirement for Podium Floor": {"section": None, "min": None, "max": None, "provided": None},
    "Projection Plot Clearance Front": {"section": None, "min": None, "max": None, "provided": None},
    "Projection Plot Clearance Side1": {"section": None, "min": None, "max": None, "provided": None},
    "Projection Plot Clearance Side2": {"section": None, "min": None, "max": None, "provided": None},
    "Projection Plot Clearance Rear": {"section": None, "min": None, "max": None, "provided": None},
}

# Function to determine compliance based on provided, min, and max values
def determine_compliance_mn(provided_value, min_value, max_value):
    # If provided_value is None, return None for both value and result
    if provided_value is None:
        return None, None

    compliance_result = "Compliant"
    
    # Check compliance with minimum value
    if min_value is not None:
        if provided_value < min_value:
            compliance_result = "Non-compliant"
    
    # Check compliance with maximum value
    if max_value is not None:
        if provided_value > max_value:
            compliance_result = "Non-compliant"

    return provided_value, compliance_result

# Main function to generate JSON structure for the table
def generate_primary_parametre_table_json(df):
    table_data = [
        {"parameter": "Area of Road widening", "provided": get_road_widening_area(df) or None},
        {"parameter": "Site Area Requirement for Service Floor", "provided": service_floor_check(df) or None},
        {"parameter": "Site Area Requirement for Podium Floor", "provided": podium_floor_check(df)[0] or None},
        {"parameter": "Projection Plot Clearance Front", "provided": None},
        {"parameter": "Projection Plot Clearance Side1", "provided": None},
        {"parameter": "Projection Plot Clearance Side2", "provided": None},
        {"parameter": "Projection Plot Clearance Rear", "provided": None}
    ]

    # Generate the final table data with compliance checking
    result_data = {"primaryParameterTable": [
        {
            "section": primary_p_rule_data[entry["parameter"]]["section"],
            "parameter": entry["parameter"],
            "minimumRequired": primary_p_rule_data[entry["parameter"]]["min"],
            "maximumPermissible": primary_p_rule_data[entry["parameter"]]["max"],
            "provided": (provided_val := determine_compliance_mn(
                entry["provided"], 
                primary_p_rule_data[entry["parameter"]]["min"], 
                primary_p_rule_data[entry["parameter"]]["max"]
            ))[0],
            "result": provided_val[1]
        } for entry in table_data
    ]}

    return result_data


# Rule dictionary to hold minimum, maximum, and provided values for secondary parameters
sec_rule_dict = {
    "1/3 of the area of roof (Service)": {"section": None, "min": None, "max": None, "provided": None},
    "Drainage Connection": {"section": None, "min": None, "max": None, "provided": None},
    "Septic Tank Location": {"section": None, "min": None, "max": None, "provided": None},
    "Septic Tank Volume": {"section": None, "min": None, "max": None, "provided": None},
    "Septic Tank Length": {"section": None, "min": None, "max": None, "provided": None},
    "Septic Tank Width": {"section": None, "min": None, "max": None, "provided": None},
    "Septic Tank Depth": {"section": None, "min": None, "max": None, "provided": None},
    "Sunshade Projection maximum permissible in MOS": {"section": None, "min": None, "max": None, "provided": None},
    "Balcony Connected to Open Space or Courtyard": {"section": None, "min": None, "max": None, "provided": None},
    "Inner Courtyard Area": {"section": None, "min": None, "max": None, "provided": None},
    "Inner Courtyard Side": {"section": None, "min": None, "max": None, "provided": None},
    "Area of Inner Courtyard having Balcony Projection": {"section": None, "min": None, "max": None, "provided": None},
    "Inner Courtyard Side having Balcony Projection": {"section": None, "min": None, "max": None, "provided": None},
    "Outer Courtyard Side": {"section": None, "min": None, "max": None, "provided": None},
    "Boundary Wall Height in Front": {"section": None, "min": None, "max": None, "provided": None},
    "Boundary Wall Height in Side1": {"section": None, "min": None, "max": None, "provided": None},
    "Boundary Wall Height in Side2": {"section": None, "min": None, "max": None, "provided": None},
    "Boundary Wall Height in Rear": {"section": None, "min": None, "max": None, "provided": None},
    "Staircase Head Room": {"section": None, "min": None, "max": None, "provided": None},
    "No. of Dwelling Units": {"section": None, "min": None, "max": None, "provided": None},
}

# Function to determine compliance based on provided, min, and max values
def determine_compliance_sp(provided_value, min_value, max_value):
    if provided_value is None:
        return None, None

    #Handle connection status strings like "Connected" or "Not Connected"
    if isinstance(provided_value, str):
        if min_value == "Should Be Connected" and provided_value == "Connected":
            return provided_value, "Compliant"
        elif min_value == "Should Be Connected" and provided_value == "Not Connected":
            return provided_value, "Non-compliant"
        else:
            return provided_value, "Invalid status"  # In case unexpected status appears

    #Handle numeric values for min/max comparison
    compliance_result = "Compliant"
    
    if isinstance(provided_value, (int, float)):
        if min_value is not None and provided_value < min_value:
            compliance_result = "Non-compliant"
        
        if max_value is not None and provided_value > max_value:
            compliance_result = "Non-compliant"

    return provided_value, compliance_result


# Function to handle septic tank details and update the rule dictionary
def update_with_septic_tank_details(septic_tank_details):
    if not septic_tank_details:
        return None
    # Assuming only one septic tank needs to be integrated
    for key, details in septic_tank_details.items():
        sec_rule_dict["Septic Tank Location"]["provided"] = details["Septic Tank Location from building"]
        sec_rule_dict["Septic Tank Volume"]["provided"] = details["Septic Tank Volume"]
        sec_rule_dict["Septic Tank Length"]["provided"] = details["Septic Tank Length"]
        sec_rule_dict["Septic Tank Width"]["provided"] = details["Septic Tank Width"]
        sec_rule_dict["Septic Tank Depth"]["provided"] = details["Septic Tank Depth"]

# Main function to generate JSON structure for the secondary parameters table
def generate_secondary_p_table_json(df, septic_tank_details=None):
    if septic_tank_details:
        update_with_septic_tank_details(septic_tank_details)
    boundary_wall_height = get_line_length_by_layer_and_color(df, "FLOOR-GROUND", 110)
    table_data = [
        {"parameter": "1/3 of the area of roof (Service)", "provided": get_terrace_service_area(df) or None},
        {"parameter": "Drainage Connection", "provided": None},
        {"parameter": "Septic Tank Location", "provided": sec_rule_dict["Septic Tank Location"]["provided"] or None},
        {"parameter": "Septic Tank Volume", "provided": sec_rule_dict["Septic Tank Volume"]["provided"] or None},
        {"parameter": "Septic Tank Length", "provided": sec_rule_dict["Septic Tank Length"]["provided"] or None},
        {"parameter": "Septic Tank Width", "provided": sec_rule_dict["Septic Tank Width"]["provided"] or None},
        {"parameter": "Septic Tank Depth", "provided": sec_rule_dict["Septic Tank Depth"]["provided"] or None },
        {"parameter": "Sunshade Projection maximum permissible in MOS", "provided":  get_polygon_dimensions(df, "FLOOR-GROUND", 64)[1] or None},
        {"parameter": "Balcony Connected to Open Space or Courtyard", "provided": check_balcony_containment(df) or None},
        {"parameter": "Inner Courtyard Area", "provided": get_courtyard_area_and_side(df,40)[0] or None},
        {"parameter": "Inner Courtyard Side", "provided": get_courtyard_area_and_side(df,40)[1] or None},
        {"parameter": "Area of Inner Courtyard having Balcony Projection", "provided": get_polygon_intersections(df,35,40) or None},
        {"parameter": "Outer Courtyard Side", "provided": get_courtyard_area_and_side(df,235)[1] or None},
        {"parameter": "Boundary Wall Height in Front", "provided": get_line_length_by_layer_and_color(df,"FLOOR-GROUND",160) or None},
        {"parameter": "Boundary Wall Height in Side1", "provided": boundary_wall_height or None},
        {"parameter": "Boundary Wall Height in Side2", "provided": boundary_wall_height or None},
        {"parameter": "Boundary Wall Height in Rear", "provided": boundary_wall_height or None},
        {"parameter": "Staircase Head Room", "provided": get_line_length_by_layer_and_color(df,"FLOOR-GROUND",231) or None},
        {"parameter": "No. of Dwelling Units", "provided": get_highest_numeric_value(df,230) or None},
    ]

    # Generate the final table data with compliance checking
    result_data = {"comparisonTable": [
        {
            "section": sec_rule_dict[entry["parameter"]]["section"],
            "parameter": entry["parameter"],
            "minimumRequired": sec_rule_dict[entry["parameter"]]["min"],
            "maximumPermissible": sec_rule_dict[entry["parameter"]]["max"],
            "provided": (provided_val := determine_compliance_sp(
                entry["provided"], 
                sec_rule_dict[entry["parameter"]]["min"], 
                sec_rule_dict[entry["parameter"]]["max"]
            ))[0],
            "result": provided_val[1]
        } for entry in table_data
    ]}

    return result_data


def temp_create_data_dictionary_for_report(df: pd.DataFrame) -> dict:
    """
    Create a data dictionary for the report from the DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data.

    Returns:
    - dict: Dictionary with report data.
    """
    try:
   
        report_dict = {
            "comparisonWithUserDataReport" : generate_comparison_table_json(df),
            "buildingGeneralDetails" : building_general_details(df),
            "compareOfColonyRules" : generate_dynamic_cr_mp_bvn_table_json(df),
            "primaryParameters" : generate_primary_parametre_table_json(df),
            "groundCovergeBreakup" : generate_gc_breakup_report(df),
            "floorWiseBreakup" : floor_wise_breakup_json(df),
            "nonCountedFarBreakup" : create_non_far_json_table(df),
            "secondaryParameters" : generate_secondary_p_table_json(df),
            "Basement height details":generate_height_report(df, "Basement Height",123),
            "habitable height details":generate_height_report(df, "Habitable Room Height",91),
            "Kitchen Height Details": generate_height_report(df,"Kitchen Height",74),
            "Bathroom related Height Details": generate_height_report(df,"Bathroom/wc height",13),
            "Other height details": generate_height_report_misc(df,{21:"Floor Height", 105:" Plinth Height",17:"Parapet Wall Height"},"Other Height" ),
            "stircase_details" : get_stair_details(df),
            "areaAndVentilation details": calculate_floor_wise_breakup(df),
            "water tank details" : calculate_watertanka_volume(df)
        }
        return report_dict

    except Exception as e:
        log_error(f"Error creating data dictionary: {e}")
        raise

def mainParser(dwFileName: str) -> dict:
    """
    Parse the DWG file and generate a report data dictionary.

    Parameters:
    - dwgFileName (str): Path to the DWG file.

    Returns:
    - dict: Dictionary with report data.
    """
    try:
        entities = parser_ts.parse_entities(dwFileName)
        df = create_dataframe(entities)
        check_prohibited_entities_and_exit(df)
        invalid_colors = [color for color in df[(df['Layer'] == "0") & (df['Type'].isin(['LINE', 'LWPOLYLINE']))]['Color'].unique() if 0 < color < 256]
        if invalid_colors:
            print(f"Invalid colors found: {invalid_colors}. Reserved colors are not allowed in layer 0.")
            raise ValueError(f"Invalid colors found: {invalid_colors}. Reserved colors are not allowed in layer 0.")
        final_json_bundle = (temp_create_data_dictionary_for_report(df))
        final_json_output = json.dumps(final_json_bundle, indent=4)
        return  final_json_output
    
    except Exception as e:
        log_error(f"Error parsing DWG file and generating report: {e}")
        raise 

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py <file_path>")
        sys.exit(1)
    file_path = sys.argv[1]
    
    try:
        result_dict = mainParser(file_path)
        print( mainParser(file_path))
        #print(json.dumps(result_dict, indent=4))
    except Exception as e:
         log_error(f"Error in main execution: {e}")
         sys.exit(1)
