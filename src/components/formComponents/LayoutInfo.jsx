import Button from "../Button";
import MuiInput from "../MuiInput";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, nextPage, prevPage } from "../../store/formSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function LayoutInfo() {
  const typeOfConst = [
    {
      value: 1,
      label: "A building intended to be used exclusively as residence",
    },
    {
      value: 2,
      label:
        "A building intended to be used as shops, storehouse, factory or carrying on trade or business or any other commercial or industrial purpose",
    },
    {
      value: 3,
      label:
        "A building intended to be used as administrative block in a factory",
    },
    {
      value: 4,
      label: "A building intended to be used for shops cum residence purpose",
    },
    { value: 5, label: "A building intended to be used as Cinema theaters" },
    {
      value: 6,
      label:
        "A building intended to be used for any social charitable, culture, Educational purposes, Dharmasala and similar types of building and any other purpose not specifically provided for",
    },
    {
      value: 7,
      label:
        "Addition or alteration in built up area or external addition or alteration which does not add to the built up area such as courtyard, compound wall, alteration in elevation or roofing such as tiles to A.C sheet of flat surface, additional opening or closing not covered by provisio to sub-rule(1) of rule 12",
    },
    {
      value: 8,
      label: "In case of addition or alteration in the purposed plan",
    },
    { value: 9, label: "Revalidation of the building permission" },
  ];

  const buildingUse = [
    { value: 1, label: "Residential" },
    { value: 2, label: "Educational" },
    { value: 3, label: "Institutional" },
    { value: 4, label: "Assembly" },
    { value: 5, label: "Mercantile" },
    { value: 6, label: "Industrial" },
    { value: 7, label: "Storage" },
    { value: 8, label: "Hazardous" },
  ];

  const layoutApprovalType = [
    {
      value: 1,
      label: "Approved Layout",
    },
    {
      value: 2,
      label: "Colony Regularized by ULB",
    },
    {
      value: 3,
      label: "Existing Area Maintained by ULB (Central Area)",
    },
    {
      value: 4,
      label: "Regularized Unauthorised Colony",
    },
  ];

  const landUseName = [
    {
      value: 1,
      label: "Residential",
    },
    {
      value: 2,
      label: "Commercial zone",
    },
    {
      value: 3,
      label: "Industrial Zone",
    },
    {
      value: 4,
      label: "Recreation",
    },
    {
      value: 5,
      label: "Public & Semi-Public",
    },
    {
      value: 6,
      label: "Special Purpose",
    },
    {
      value: 7,
      label: "Transportation",
    },
    {
      value: 8,
      label: "Public Utilities and Facilities",
    },
    {
      value: 9,
      label: "Water Bodies",
    },
    {
      value: 10,
      label: "Agriculture",
    },
  ];

  const landSubUse = [
    {
      value: 1,
      label: "Residential",
    },
    {
      value: 2,
      label: "Residential with shop Lines at ground floor",
    },
    {
      value: 3,
      label: "Medium density",
    },
    {
      value: 4,
      label: "Low density",
    },
    {
      value: 5,
      label: "City centre",
    },
    {
      value: 6,
      label: "Sub city centre",
    },
    {
      value: 7,
      label: "Community centre",
    },
    {
      value: 8,
      label: "Local shopping centre",
    },
    {
      value: 9,
      label: "Convenience shopping centre",
    },
    {
      value: 10,
      label: "Mandi",
    },
    {
      value: 11,
      label: "Categorised markets",
    },
    {
      value: 12,
      label: "Service Industries",
    },
    {
      value: 13,
      label: "General Industries",
    },
    {
      value: 14,
      label: "Special Industries",
    },
    {
      value: 15,
      label: "Parks",
    },
    {
      value: 16,
      label: "Green Belts or Afforested area",
    },
    {
      value: 17,
      label: "Regional Parks (Zoological or Botanical Parks)",
    },
    {
      value: 18,
      label: "Preservation of Natural Areas or Landscape Areas",
    },
    {
      value: 19,
      label: "Play Grounds",
    },
    {
      value: 20,
      label: "Stadiums",
    },
    {
      value: 21,
      label: "Lake Front Development",
    },
    {
      value: 22,
      label: "Exhibition Grounds",
    },
    {
      value: 23,
      label:
        "Public Institutions and Administrative Areas/Education and Research/Health Social/Cultural Institutional activities",
    },
    {
      value: 24,
      label: "Tourism Promotion Zone",
    },
    {
      value: 25,
      label: "Conservation Zone",
    },
    {
      value: 26,
      label: "Dry Port or Container Deports",
    },
    {
      value: 27,
      label: "Oil Depots or Inflammables goods Depots",
    },
    {
      value: 28,
      label: "Building Material Yards",
    },
    {
      value: 29,
      label: "Obnoxious Industries",
    },
    {
      value: 30,
      label: "SEZ",
    },
    {
      value: 31,
      label: "Mining Areas",
    },
    {
      value: 32,
      label: "Reserved Forest or National Parks or Wildlife Sanctuaries",
    },
    {
      value: 33,
      label: "Others",
    },
    {
      value: 34,
      label: "Bus-Stands or Terminus",
    },
    {
      value: 35,
      label: "Bus Pick-up Stations",
    },
    {
      value: 36,
      label: "Roads",
    },
    {
      value: 37,
      label: "Railway Stations",
    },
    {
      value: 38,
      label: "Railway lines",
    },
    {
      value: 39,
      label: "Bus Depot",
    },
    {
      value: 40,
      label: "Transport Nagar",
    },
    {
      value: 41,
      label: "Helipads/Airport",
    },
    {
      value: 42,
      label: "Metro Rail Stations",
    },
    {
      value: 43,
      label: "Water Treatment Plants",
    },
    {
      value: 44,
      label: "Sewerage Treartment Plant/Oxidation Ponds",
    },
    {
      value: 45,
      label: "Electric Sub-Stations",
    },
    {
      value: 46,
      label: "Trenching Grounds",
    },
    {
      value: 47,
      label:
        "Trunk Line Corridor (Water/Sewer/Extra Voltage Electric Lines/Gas or Oil Pipe Lines and related structures)",
    },
    {
      value: 48,
      label: "Radio/TV Stations",
    },
    {
      value: 49,
      label: "Telephone Exchange",
    },
    {
      value: 50,
      label: "Fire Control Stations",
    },
    {
      value: 51,
      label: "Solid Waste Disposal Plants/Decomposition plants",
    },
    {
      value: 52,
      label: "River",
    },
    {
      value: 53,
      label: "Lakes/Ponds/Reservoirs",
    },
    {
      value: 54,
      label: "Nallah/Canal",
    },
    {
      value: 55,
      label: "Flood Affected areas",
    },
    {
      value: 56,
      label: "Agricultural lands",
    },
    {
      value: 57,
      label: "Village abaadi extension",
    },
    {
      value: 58,
      label: "BandaSubUse",
    },
    {
      value: 59,
      label: "Guest House",
    },
    {
      value: 60,
      label: "Holiday Homes and Restaurants",
    },
    {
      value: 61,
      label: "Godown and Storage",
    },
    {
      value: 62,
      label: "Wholesale Market",
    },
    {
      value: 63,
      label: "Block Level Centre",
    },
    {
      value: 64,
      label: "Planning Unit Centre",
    },
    {
      value: 65,
      label: "Investment Unit Centre",
    },
    {
      value: 66,
      label: "Circle Segment Level",
    },
    {
      value: 67,
      label: "General Centre",
    },
    {
      value: 68,
      label: "Wholesale Trade",
    },
    {
      value: 69,
      label: "Wholesale Commercial",
    },
    {
      value: 70,
      label: "Warehouse",
    },
    {
      value: 71,
      label: "Suvidhajanak Shop",
    },
    {
      value: 72,
      label: "Low Hazard",
    },
    {
      value: 73,
      label: "Medium Hazard",
    },
    {
      value: 74,
      Label: "High Hazard",
    },
    {
      value: 75,
      label: "Rural Zone",
    },
  ];

  const typeOfBuilding = [
    { value: 1, label: "Residential Buildings height up to 12.5 Meters" },
    { value: 2, label: "Other Buildings height up to 12.5 Meters" },
    {
      value: 3,
      label: "All Buildings Height above 12.5 and up to 30 Meters",
    },
    { value: 4, label: "All Buildings Height above 30 Meters" },
  ];

  const buildingActivity = [
    {
      value: "1",
      label: "High rise Apartment",
    },
    {
      value: "2",
      label: "Residential dwelling unit- Row",
    },
    {
      value: "3",
      label: "Residential dwelling unit- Semi-detached",
    },
    {
      value: "4",
      label: "Residential dwelling unit- detached type",
    },
    {
      value: "5",
      label: "Residential with shops line at ground floor",
    },
    {
      value: "6",
      label: "Group housing",
    },
    {
      value: "7",
      label: "Multi-plotted ",
    },
    {
      value: "8",
      label: "Guest Houses",
    },
    {
      value: "9",
      label: "Rest House",
    },
    {
      value: "10",
      label: "Lodging Houses",
    },
    {
      value: "11",
      label: "Boarding House ",
    },
    {
      value: "12",
      label: "Farm house",
    },
    {
      value: "13",
      label: "Dormitories",
    },
    {
      value: "14",
      label: "Night Shelter",
    },
    {
      value: "15",
      label: "Dharmashala",
    },
    {
      value: "16",
      label: "Old age Home",
    },
    {
      value: "17",
      label: "Orphanage ",
    },
    {
      value: "18",
      label: "Hostels",
    },
    {
      value: "19",
      label: "Working Women hostel",
    },
    {
      value: "20",
      label: "Colleges ",
    },
    {
      value: "21",
      label: "Pre Primary School",
    },
    {
      value: "22",
      label: "Secondary School",
    },
    {
      value: "23",
      label: "University",
    },
    {
      value: "24",
      label: "Hospital (Up to 200 beds)",
    },
    {
      value: "25",
      label: "Nursing home",
    },
    {
      value: "26",
      label: "Jails ",
    },
    {
      value: "27",
      label: "Court ",
    },
    {
      value: "28",
      label: "Post office",
    },
    {
      value: "29",
      label: "Bank",
    },
    {
      value: "30",
      label: "Fire fighting station",
    },
    {
      value: "31",
      label: "Police station",
    },
    {
      value: "32",
      label: "Radio",
    },
    {
      value: "33",
      label: "Telephone exchange ",
    },
    {
      value: "34",
      label: "Office building (Govt./Semi-Govt./Private) ",
    },
    {
      value: "35",
      label: "N.G.O.",
    },
    {
      value: "36",
      label: "Telecom tower & station ",
    },
    {
      value: "37",
      label: "Theatre ",
    },
    {
      value: "38",
      label: "Cinema ",
    },
    {
      value: "39",
      label: "Library",
    },
    {
      value: "40",
      label: "Community center",
    },
    {
      value: "41",
      label: "Marriage Garden",
    },
    {
      value: "42",
      label: "Assembly hall",
    },
    {
      value: "43",
      label: "Conference hall",
    },
    {
      value: "44",
      label: "Exhibition hall",
    },
    {
      value: "45",
      label: "Museum ",
    },
    {
      value: "46",
      label: "Social welfare center with Auditorium",
    },
    {
      value: "47",
      label: "Gymnasium ",
    },
    {
      value: "48",
      label: "Restaurants ",
    },
    {
      value: "49",
      label: "Place of worship ",
    },
    {
      value: "50",
      label: "Club",
    },
    {
      value: "51",
      label: "Bus station ",
    },
    {
      value: "52",
      label: "Railway station ",
    },
    {
      value: "53",
      label: "Zoo",
    },
    {
      value: "54",
      label: "Water park",
    },
    {
      value: "55",
      label: "Stadiums ",
    },
    {
      value: "56",
      label: "Hotel",
    },
    {
      value: "57",
      label: "Motel",
    },
    {
      value: "58",
      label: "Multiplex ",
    },
    {
      value: "59",
      label: "Shopping malls",
    },
    {
      value: "60",
      label: "Super market",
    },
    {
      value: "61",
      label: "Marriage hall",
    },
    {
      value: "62",
      label: "Banquet hall ",
    },
    {
      value: "63",
      label: "Laborites ",
    },
    {
      value: "64",
      label: "Power plants",
    },
    {
      value: "65",
      label: "Refineries ",
    },
    {
      value: "66",
      label: "Gas plants",
    },
    {
      value: "67",
      label: "Dairies ",
    },
    {
      value: "68",
      label: "Factories ",
    },
    {
      value: "69",
      label: "Warehouses ",
    },
    {
      value: "70",
      label: "Cold storage",
    },
    {
      value: "71",
      label: "Freight depots",
    },
    {
      value: "72",
      label: "Godown ",
    },
    {
      value: "73",
      label: "Public garages",
    },
    {
      value: "74",
      label: "Hangers ",
    },
    {
      value: "75",
      label: "Truck terminals",
    },
    {
      value: "76",
      label: "Store house",
    },
    {
      value: "77",
      label: "Fuel Filling station",
    },
    {
      value: "78",
      label: "Gas go down",
    },
    {
      value: "79",
      label: "Petroleum product depot ",
    },
    {
      value: "80",
      label: "Depot for hazardous substance",
    },
    {
      value: "81",
      label: "Nursery School",
    },
    {
      value: "82",
      label: "Primary School",
    },
    {
      value: "83",
      label: "Senior Sec. School",
    },
    {
      value: "84",
      label: "Medical college",
    },
    {
      value: "85",
      label: "Resorts ",
    },
    {
      value: "86",
      label: "Amusement park",
    },
    {
      value: "87",
      label: "TV station",
    },
    {
      value: "88",
      label: "Social welfare center without Auditorium",
    },
    {
      value: "89",
      label: "Bus terminal",
    },
    {
      value: "90",
      label: "Bus depot with workshop",
    },
    {
      value: "91",
      label: "Polytechnic college",
    },
    {
      value: "92",
      label: "Floor mill",
    },
    {
      value: "93",
      label: "Light and service industry ",
    },
    {
      value: "94",
      label: "Information Technology industry",
    },
    {
      value: "95",
      label: "Ice Factory",
    },
    {
      value: "96",
      label: "Hospital (Above 200 beds)",
    },
    {
      value: "97",
      label: "Medical college ",
    },
    {
      value: "98",
      label: "Health Center (Up-to 30 beds)",
    },
    {
      value: "99",
      label: "Convenience Shops",
    },
    {
      value: "100",
      label: "local shopping center",
    },
    {
      value: "101",
      label: "Wholesale commercial market",
    },
    {
      value: "102",
      label: "Professional office",
    },
    {
      value: "103",
      label: "Rural Center",
    },
    {
      value: "104",
      label: "Boundry Wall",
    },
    {
      value: "105",
      label: "Colleges",
    },
    {
      value: "106",
      label: "Jails",
    },
    {
      value: "107",
      label: "Court",
    },
    {
      value: "108",
      label: "Telephone exchange",
    },
    {
      value: "109",
      label: "Office building (Govt./Semi-Govt./Private)",
    },
    {
      value: "110",
      label: "Telecom tower & station",
    },
    {
      value: "111",
      label: "Resorts",
    },
    {
      value: "112",
      label: "Theatre",
    },
    {
      value: "113",
      label: "Cinema",
    },
    {
      value: "114",
      label: "Museum",
    },
    {
      value: "115",
      label: "Gymnasium",
    },
    {
      value: "116",
      label: "Restaurants",
    },
    {
      value: "117",
      label: "Place of worship",
    },
    {
      value: "118",
      label: "Bus station",
    },
    {
      value: "119",
      label: "Railway station",
    },
    {
      value: "120",
      label: "Stadiums",
    },
    {
      value: "121",
      label: "Multiplex",
    },
    {
      value: "122",
      label: "Banquet hall",
    },
    {
      value: "123",
      label: "Light and service industry",
    },
    {
      value: "124",
      label: "Laborites",
    },
    {
      value: "125",
      label: "Refineries",
    },
    {
      value: "126",
      label: "Dairies",
    },
    {
      value: "127",
      label: "Factories",
    },
    {
      value: "128",
      label: "Warehouses",
    },
    {
      value: "129",
      label: "Godown",
    },
    {
      value: "130",
      label: "Hangers",
    },
    {
      value: "131",
      label: "Petroleum product depot",
    },
    {
      value: "132",
      label: "Residential cum Work Plot",
    },
    {
      value: "133",
      label: "High rise Apartment",
    },
    {
      value: "134",
      label: "Multi-plotted",
    },
    {
      value: "135",
      label: "Boarding House",
    },
    {
      value: "136",
      label: "Orphanage",
    },
    {
      value: "137",
      label: "Hospital with 30 Beds",
    },
    {
      value: "138",
      label: "Hospital with 50 Beds",
    },
    {
      value: "139",
      label: "Hospital with 100 Beds",
    },
    {
      value: "140",
      label: "Yoga center",
    },
    {
      value: "141",
      label: "Vocational institute",
    },
    {
      value: "142",
      label: "Convention center",
    },
    {
      value: "143",
      label: "Convention center  with hotel",
    },
    {
      value: "144",
      label: "Staff Quarters",
    },
    {
      value: "145",
      label: "Intintermediate Hospital",
    },
    {
      value: "146",
      label: "NURSING AND PARAMEDICAL INSTITUTE",
    },
    {
      value: "147",
      label: "Hospital",
    },
    {
      value: "148",
      label: "CLINIC/POLY CLINIC/DISPENSARY",
    },
    {
      value: "149",
      label: "Lodging and boarding",
    },
    {
      value: "150",
      label:
        "RESEARCH AND DEVELOPMENT CENTRE (EXCLUDING CONTAGIOUS AND HAZARDOUS ACTIVITIES)",
    },
    {
      value: "151",
      label: "SUPER MARKET / DEPARTMENTAL STORE",
    },
    {
      value: "152",
      label: "CULTURAL AND PUBLICITY CENTER",
    },
    {
      value: "153",
      label: "ENTERTAINMENT ",
    },
  ];

  const defaultData = useSelector((state) => state.form.formData);

  const dispatch = useDispatch();

  const { register, handleSubmit, getValues, control } = useForm({
    defaultValues: defaultData,
  });

  const handlePageChange = () => {
    const values = getValues();
    dispatch(addFormData(values));
    dispatch(prevPage());
  };

  const sendFormData = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    dispatch(nextPage());
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(sendFormData)}
        className="m-5 p-2 flex flex-col gap-3"
      >
        <div className="grid grid-cols-4 gap-3 bg-white border border-gray-200 rounded-lg shadow p-3">
          <MuiInput
            {...register("applicationId")}
            label="T&CP Permission No/Application Id"
          />

          <Controller
            control={control}
            name="typeOfPlot"
            render={({ field }) => (
              <TextField
                select
                label="TYPE OF PLOT/LAYOUT"
                id="typeofplot-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {layoutApprovalType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="layoutApproval"
            render={({ field }) => (
              <TextField
                select
                label="LAYOUT APPROVAL TYPE"
                id="layoutapproval-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {layoutApprovalType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            id="outlined-select-currency"
            select
            {...register("division")}
            label="DIVISION"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {layoutApprovalType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            {...register("district")}
            label="DISTRICT"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {layoutApprovalType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            {...register("ulbName")}
            label="ULB NAME"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {layoutApprovalType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <MuiInput label="ZONE" {...register("zone")} />

          <MuiInput label="WARD" {...register("ward")} />
          <MuiInput label="COLONY NAME" {...register("colonyName")} />
          <Controller
            control={control}
            name="landUse"
            render={({ field }) => (
              <TextField
                select
                label="LAND USE"
                id="landuse-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {landUseName.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="buildingUse"
            render={({ field }) => (
              <TextField
                select
                label="Building Use"
                id="building-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {buildingUse.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="landSubUse"
            render={({ field }) => (
              <TextField
                select
                label="LAND SUB USE"
                id="landsubuse-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {landSubUse.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="buildingActivity"
            render={({ field }) => (
              <TextField
                select
                label="BUILDING ACTIVITY"
                id="buildingactivity-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {buildingActivity.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="typeOfBuilding"
            render={({ field }) => (
              <TextField
                select
                label="TYPE OF BUILDING"
                id="typeofbuilding-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {typeOfBuilding.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="typeOfConstruction"
            render={({ field }) => (
              <TextField
                select
                label="TYPE OF CONSTRUCTION"
                id="typeofconstruction-select"
                {...field}
                value={field.value || ""}
                size="small"
              >
                {typeOfConst.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <MuiInput label="PLOT NO" {...register("plotNo")} />
          <FormControl className="flex">
            <FormLabel className="text-sm" id="demo-radio-buttons-group-label">
              Is Plot Irregular
            </FormLabel>
            <Controller
              control={control}
              name="isPlotIrregular"
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="block"
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={field.value || "Yes"}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
          </FormControl>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button type="button" onClick={() => handlePageChange()}>
            Back
          </Button>
          <Button type="submit">Save & Next</Button>
        </div>
      </form>
    </div>
  );
}
