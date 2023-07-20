import SummaryTable from "../body/SummaryTable";
import Cards from "../header/Cards";

export default function Summary({table}){
  console.log(table)
    return (
        <div>
          <Cards summary={true} cardsData={table.stats}/>
          <SummaryTable table={table.table}/>
        </div>
      );
}