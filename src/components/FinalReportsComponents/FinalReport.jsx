import logo from "../../assets/images/mp.png";
import BuildingGeneralDetailsTable from "../tableComponents/BuildingGeneralDetails";
import FloorwiseBreakupTable from "../tableComponents/FloorWiseBreakup";
import NonFARBreakupTable from "../tableComponents/NonFARBreakup";
import SecondaryParameters from "../tableComponents/SecondaryParameters";
import BasementHeightDetails from "../tableComponents/BasementHeightDetails";
import FireWaterTankCalculation from "../tableComponents/FireWaterTankCalculation";
import WaterTankCalculation from "../tableComponents/WaterTankCalculation";
import BathroomRelatedHeightDeatils from "../tableComponents/BathroomRelatedHeightDetails";
import DimensionsAndVentilationDetails from "../tableComponents/DimensionsAndVentilationDetails";
import VentilationShaftCalculation from "../tableComponents/VentilationShaftDetails";
import RiserCountPerFlight from "../tableComponents/RiserCountPerFlight";
import OtherHelightDetails from "../tableComponents/OtherHeightDetails";
import KitchenHeightDetails from "../tableComponents/KitchenHeightDetails";
import HabitableHeightDeatils from "../tableComponents/HabitableHeightDetails";
import StaircaseDetails from "../tableComponents/StaircaseDetails";
import ContinuousBalcony from "../tableComponents/ContinuousBalcony";
import ECSParkingReuired from "../tableComponents/ECSParkingRequired";
import RuleApplicable from "../tableComponents/RuleApplicable";
import PodiumHeightDetails from "../tableComponents/PodiumHeightDetails";
import TravelDistance from "../tableComponents/TravelDistance";
import LiftDetails from "../tableComponents/LiftDetails";
import BuildingHeights from "../tableComponents/BuildingHeights";
import ECSParkingProvided from "../tableComponents/EcsParkingProvided";
import EscalatorDetails from "../tableComponents/EscalatorDetails";
import BuildingCategoryDetails from "../tableComponents/BuildingCategoryDetails";
import SiteExtentDetails from "../tableComponents/SiteExtentDetails";
import FrontageOfPlot from "../tableComponents/Frontageofplot";
import FAR from "../tableComponents/FAR";
import RoadWidth from "../tableComponents/RoadWidth";
import MarginalOpenSpaceDetails from "../tableComponents/MarginalOpenSpaceDetails";
import NonFARTable from "../tableComponents/NonFARTable";
import StiltHeightDetailsTable from "../tableComponents/StiltHeightDetailsTable";
import LedgeLoftHeightTable from "../tableComponents/LedgeLoftHeightTable";
import HandrailDetails from "../tableComponents/HandrailDetails";
import LiftEscalatorandMovingWalkCount from "../tableComponents/LiftEscalatorandMovingWalkCount";
import ComparisonofColonyRulesMasterPlan from "../tableComponents/ComparisonofColonyRulesMasterPlan";
import ProposalInformation from "../tableComponents/ProposalInformation";
import PrimaryParameters from "../tableComponents/PrimaryParameters";
import GroundCoverageBreakup from "../tableComponents/GroundCoverageBreakup";
import ComparisonUserInput from "../tableComponents/ComparisonUserInput";
import StaircaseDetailsTreadRiser from "../tableComponents/StaircaseDetailsTreadRiser";
import StaircaseDetailsWidth from "../tableComponents/StaircaseDetailsWidth";
const FinalReport = ({ finalData, processedData }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-white border-gray-200 shadow tab-sty-report p-5">
        <div className="m-auto mb-8 relative">
          <img
            className="h-20 w-20 absolute top-0 left-0"
            src={logo}
            alt="logo"
          />
          <h1 className="text-2xl text-cyan-700 text-center">
            Scrutiny Report
          </h1>
        </div>
        <div className="flex justify-center mb-3">
          <h2 className="w-1/4 font-medium text-center border text-gray-700 border-slate-300 p-2">
            Type of Building
          </h2>
          <h2 className="w-1/4 font-medium text-center border text-gray-700 border-slate-300 p-2">
            Row Type
          </h2>
        </div>
        {/* Proposal information */}
        <ProposalInformation
          processedData={processedData}
          finalData={finalData}
        />
        {/* Rules Applicable for Non Compliant Parameters */}
        <RuleApplicable />
        {/* Comparison User Input and Information from Drawing and Database */}
        <ComparisonUserInput
          data={
            processedData?.comparisonWithUserDataReport?.["comparisonTable"]
          }
        />
        {/* Building General Details */}
        <BuildingGeneralDetailsTable
          data={processedData?.["buildingGeneralDetails"]}
        />
        {/* Comparison of Colony Rules with Master Plan / BVN */}
        <ComparisonofColonyRulesMasterPlan />
        <PrimaryParameters
          data={processedData?.primaryParameters?.["primaryParameterTable"]}
        />
        {/*Ground Coverage Breakup */}
        <GroundCoverageBreakup
          groundCoverageBreakup={processedData?.["groundCovergeBreakup"]}
        />
        ;{/*Floorwise Breakup */}
        {/* <FloorwiseBreakupTable
          data={processedData?.["floorWiseBreakup"]}
        /> */}
        {/*NonFar Breakup */}
        {/* <NonFARBreakupTable data={processedData?.["Non FAR Breakup Table"]} /> */}
        {/* Secondary Parameters */}
        <SecondaryParameters
          data={processedData?.secondaryParameters?.["comparisonTable"]}
        />
        {/* Basement Height Details */}
        <BasementHeightDetails />
        {/* Habitable Height Details */}
        <HabitableHeightDeatils
          data={
            processedData?.["habitable height details"]?.[
              "Habitable Room Height Details"
            ]
          }
        />
        {/* Kitchen Height Details */}
        <KitchenHeightDetails
          data={
            processedData?.["Kitchen Height Details"]?.[
              "Kitchen Height Details"
            ]
          }
        />
        {/* Bathroom Related Height Details */}
        <BathroomRelatedHeightDeatils
          data={
            processedData?.["Bathroom related Height Details"]?.[
              "Bathroom/wc height Details"
            ]
          }
        />
        {/* Other Height Details */}
        <OtherHelightDetails
          data={
            processedData?.["Other height details"]?.["Other Height Details"]
          }
        />
        {/* Continuous Balcony */}
        <ContinuousBalcony />
        {/* ECS Parking Required */}
        <ECSParkingReuired />
        {/* Area, Dimensions And Ventilation Details */}
        {/* <DimensionsAndVentilationDetails
          data={processedData?.["areaAndVentilation details"]}
        /> */}
        {/* Staircase Details [BVR 80] */}
        {/* <StaircaseDetails /> */}
        {/* Riser Count Per Flight [BVR 80(5)] */}
        <RiserCountPerFlight
          data={processedData?.["stircase_details"]?.["riserCountPerFlight"]}
        />
        <StaircaseDetailsTreadRiser
          data={
            processedData?.["stircase_details"]?.["staircaseDetailsTreadRiser"]
          }
        />
        <StaircaseDetailsWidth
          data={processedData?.["stircase_details"]?.["staircaseDetailsWidth"]}
        />
        {/* Ventilation Shaft Details [BVR 56 (6b)] */}
        <VentilationShaftCalculation />
        {/* Water Tank Calculation */}
        <WaterTankCalculation
          data={processedData?.["water tank details"]?.["WaterTankCalculation"]}
        />
        {/* Fire Water Tank Calculation */}
        <FireWaterTankCalculation />
        <PodiumHeightDetails />
        <TravelDistance />
        <LiftDetails />
        <HandrailDetails
          data={processedData?.["stircase_details"]?.["handrailDetails"]}
        />
        <BuildingHeights />
        <ECSParkingProvided />
        <EscalatorDetails />
        <BuildingCategoryDetails />
        <SiteExtentDetails />
        <FrontageOfPlot />
        <FAR />
        <RoadWidth />
        <MarginalOpenSpaceDetails />
        <NonFARTable />
        <StiltHeightDetailsTable />
        <LedgeLoftHeightTable />
        <LiftEscalatorandMovingWalkCount />
      </div>
    </div>
  );
};
export default FinalReport;
