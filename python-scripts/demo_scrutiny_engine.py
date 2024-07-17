import pandas as pd
import sys
import json
import build_plan_p # type: ignore
# Dependencies: Pandas, ezdxf,odafc 



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
#Advantages: loc and iloc allow for more granular control, especially when selecting specific columns or rows based on complex conditions involving different data types
def get_calculated_FAR(df):
    """
    Calculate Area of floors and deductions1 from the input DataFrame.
    
    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data extracted from DXF files.
    
    Returns:
    - Area_of_floors (float): Sum of areas of closed polylines with color 181 or 5.
    - deductions1 (float): Sum of areas of closed polylines with color 22, 11, 115, or 51.
    """
    # Calculate groupedArea
    Area_of_floors = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Polyline flags'] == 1) & 
                         (df['Color'].isin([181, 4, 35, 120])), 'Polygon Area'].sum()
    
    

     # Calculate deductions1
    deductions_1 = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Polyline flags'] == 1) & 
                          (df['Color'].isin([115, 51, 4, 35, 120])), 'Polygon Area'].sum()
    
    

    deductions_area = df.loc[(df['Type'] == 'LWPOLYLINE')& (df['Polyline closed Status'] == True) & (df['Color'] == 3), 'Polygon Area'].sum()

    plot_AR = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 7) & (df['Polyline flags'] == 1), 'Polygon Area'].iloc[0]
    #plot_AR_value = plot_AR.iloc[0]
    
    floor_AR = float((Area_of_floors-(deductions_1 + deductions_area))/plot_AR)
    
    #return groupedArea, deductions1
    return round(floor_AR, 4)


#---------------------------------------------------------------------------------------------------------------------------------------------------
def get_building_height(df): 
    # Filter the DataFrame for lines with color 151
    lines_with_color_151 = df[(df['Type'] == 'LINE') & (df['Color'] == 151)]
    
    # Check if more than one line is found
    if lines_with_color_151.shape[0] > 1:
        raise ValueError("More than one line found with color 151")
    
    # Return the building height as the length of the first line
    return round(lines_with_color_151['Length'].values[0], 2)

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
                             (df['Color'].isin([181, 4, 35, 120])), 'Polygon Area']
    non_counted_far_area_df = df.loc[(df['Type'] == 'LWPOLYLINE') 
                                 & (df['Polyline closed Status'] == True) 
                                 & (df['Color'].isin([4, 35, 51, 115, 120])), 
                                 'Polygon Area'] 
    deductions_area_df = df.loc[(df['Type'] == 'LWPOLYLINE')& (df['Polyline closed Status'] == True) & (df['Color'] == 3), 'Polygon Area']
    
    # Calculate the total proposed builtup area
    total_builtup_area = builtup_area_df.sum()
    
    non_counted_far_area = non_counted_far_area_df.sum()
    
    deductions_area = deductions_area_df.sum()
    
    pba = total_builtup_area - (non_counted_far_area +  deductions_area)
    return round(pba, 2)


#---------------------------------------------------------------------------------------------------------------------------------------------------
def get_calculated_gc_percentage(df):
    """
    Calculate Ground Coverage percentage from the input DataFrame.

    Parameters:
    - df (pd.DataFrame): DataFrame containing entity data extracted from DXF files.

    Returns:
    - ground_coverage (float): Ground Coverage percentage.
    """
    # Calculate plot_AR (Area with Color 7 and Polyline flags 1)
    plot_ar = df.loc[(df['Layer'] == 'FLOOR-GROUND') & (df['Type'] == 'LWPOLYLINE') & (df['Color'] == 7) & (df['Polyline flags'] == 1), 'Polygon Area']
    if plot_ar.empty:
        raise ValueError("Plot area not found with color 7 and polyline flags 1")

    plot_ar_value = plot_ar.iloc[0] if not plot_ar.empty else 0.0  # Get the float value from plot_AR, default to 0 if empty


    # Calculate builtup_Area (Area with Color 181, Type LWPOLYLINE, Polyline flags 1, and Layer FLOOR-GROUND)
    builtup_area = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Polyline flags'] == 1) & 
                          (df['Layer'] == 'FLOOR-GROUND') & (df['Color'] == 10), 'Polygon Area']
    if builtup_area.empty:
        raise ValueError("Built-up area not found with color 10, polyline flags 1, and layer FLOOR-GROUND")

    builtup_area_value = builtup_area.iloc[0] if not builtup_area.empty else 0.0  # Get the float value from builtup_Area, default to 0 if empty
    #------------------------------------------------------
    non_counted_far_area_df = df.loc[(df['Type'] == 'LWPOLYLINE') 
                                 & (df['Polyline closed Status'] == True)
                                 & (df['Layer'] == 'FLOOR-GROUND') 
                                 & (df['Color'].isin([4, 115])), 
                                 'Polygon Area'] 
    
    non_counted_far_value = non_counted_far_area_df.iloc[0] if not non_counted_far_area_df.empty else 0.0

 
    #------------------------------------------------------

    deductions_area_df = df.loc[(df['Type'] == 'LWPOLYLINE') 
                                 & (df['Polyline closed Status'] == True)
                                 & (df['Layer'] == 'FLOOR-GROUND') 
                                 & (df['Color'].isin([3])), 
                                 'Polygon Area'] 
    
    deductions_area_Value = deductions_area_df.iloc[0] if not deductions_area_df.empty else 0.0

    
    #----

    # Calculate Ground Coverage percentage
    if builtup_area_value > 0:
        ground_coverage = ((builtup_area_value - (non_counted_far_value + deductions_area_Value)) / plot_ar_value) * 100
    else:
        raise ValueError("Built-up area is zero. Cannot calculate ground coverage.")

    return round(ground_coverage, 2)


#-----------------------------------------------------------------------------------------------------------------------------------------------
def get_road_width(df):
    """
    Calculate the road width from the input DataFrame.

    Parameters:
    df (pd.DataFrame): DataFrame containing entity data extracted from DXF files.

    Returns:
    float: The road width.
    """
    # Filter the DataFrame for LINE entities with color 41
    road_lines = df.loc[(df['Type'] == 'LINE') & (df['Color'] == 41), 'Length']

    # Check if there are at least two LINE entities with color 41
    if len(road_lines) == 0:
        raise ValueError("No LINE entities found with color 41.")

    # Calculate the road width as the length of the single line
    road_width = road_lines.iloc[0]

    # Round the road width to four decimal places
    road_width = round(road_width, 2)

    return road_width
#-----------------------------------------------------------------------------------------------------------------------------------------------
def get_frontage_of_plot(df):
    """
    Calculate the frontage of the plot from the input DataFrame.

    Parameters:
    df (pd.DataFrame): DataFrame containing entity data extracted from DXF files.

    Returns:
    float: The frontage of the plot.
    """
    # Filter the DataFrame for LWPOLYLINE entities with color 96 and flag 0
    plot_frontage = df.loc[(df['Type'] == 'LWPOLYLINE') & (df['Color'] == 96) & (df['Polyline flags'] == 0), 'Polyline Length']

    # Check if there is at least one LWPOLYLINE entity with color 96 and flag 0
    if plot_frontage.empty:
        raise ValueError("No LWPOLYLINE entities found with color 96 and flag 0.")

    # Calculate the frontage of the plot as the length of the single line
    frontage_of_plot = plot_frontage.iloc[0]

    # Round the frontage of the plot to four decimal places
    frontage_of_plot = round(frontage_of_plot, 3)

    return frontage_of_plot

#-----------------------------------------------------------------------------------------------------------------------------------------------
def temp_create_data_dictionary_for_report(df):
    data_dictionary = {
        "Number of floors:": int(get_floor_count(df)),
        "Building height:": get_building_height(df),
        "Proposed_builtup_area:": get_proposed_builtup_area(df),
        "Plot area:": get_net_plot_area(df),
        "Road width": get_road_width(df),
        "Frontage of plot": round(get_frontage_of_plot(df), 2),
        "Ground Coverage percentage": get_calculated_gc_percentage(df),
        "Floor Area Ratio": get_calculated_FAR(df),

    }
    return data_dictionary

#-----------------------------------------------------------------------------------------------------------------------------------------------

def mainParser(dwgFileName):
    entities = build_plan_p.parse_entities(dwgFileName)
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