
import Card from "./Card";
export default function Cards(props) {
    if(props.summary){
        return (
            <div className="floating-top">
            <Card
              color={"green"}
              title={"Összesen elszámolt"}
              value={props.cardsData.doneall + " Ft"}
              bottomLink={{ name: "Új utalás", ref: "/add_transfer" }}
            ></Card>
              <Card
                color={"blue"}
                title={"Összesen költött"}
                value={props.cardsData.spentall + " Ft"}
                bottomLink={{ name: "Új költés", ref: "/add_expense" }}
              ></Card>
              <Card
                color={"red"}
                title={"A spórolós"}
                value={props.cardsData.thrifty}
              ></Card>
            </div>
          );
    }
    else{
        console.log('fuck')
    }
  
}
