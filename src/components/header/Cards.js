import Card from "./Card";
export default function Cards(props) {
    if(props.summary){
        return (
            <div class="floating-top">
            <Card
              color={"green"}
              title={"Összesen elszámolt"}
              value={"41 Ft"}
              bottomLink={{ name: "Új utalás", ref: "/add_transfer" }}
            ></Card>
              <Card
                color={"blue"}
                title={"Összesen költött"}
                value={"45 Ft"}
                bottomLink={{ name: "Új költés", ref: "/add_expense" }}
              ></Card>
              <Card
                color={"red"}
                title={"A spórolós"}
                value={"Bujdi"}
              ></Card>
              
            </div>
          );
    }
    else{
        console.log('fuck')
    }
  
}
