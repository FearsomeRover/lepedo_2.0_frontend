
// import axios from "axios";
// import { useState } from "react";
// import { Form } from "react-router-dom";
// import ValidateInput from "../hooks/validateInput";
// import './newUserForm.css'

// export default function NewUserForm() {

//     // const {
//     //     value: enteredName,
//     //     isValid: enteredNameIsValid,
//     //     hasError: nameInputHasError,
//     //     valueChangeHandler: nameChangedHandler,
//     //     inputBlurHandler: nameBlurHandler,
//     //     reset: resetNameInput,
//     //   } = ValidateInput((value) => value.trim() !== '');
//     //   const {
//     //     value: enteredRevTag,
//     //     isValid: enteredRevTagIsValid,
//     //     hasError: revTagInputHasError,
//     //     valueChangeHandler: revTagChangedHandler,
//     //     inputBlurHandler: revTagBlurHandler,
//     //     reset: resetRevTagInput,
//     //   } = ValidateInput(async (value) =>{
//     //     if(value){
//     //       console.log(process.env.REACT_APP_BASE_URL + '/user/revtag/' + value)
//     //         const data = await axios.get(process.env.REACT_APP_BASE_URL + '/user/revtag/' + value);
//     //         console.log(data.data)
//     //         return data.data
//     //     }
//     //     return false
        
//     //   });
//     //   const revTagAxios = async (value) =>{
//     //     const data = await axios.get('http://192.168.2.102:3000/user/revtag/' + value);
//     //     console.log(data)
//     //     return data.value === 'true'
//     //   }
// //   const handleRevBlur = async event =>{
// //     // const data = await axios.get('http://192.168.2.102:3000/user/revtag/' + revTag);
// //     // console.log(data)
// //     console.log('blur')
// //   }
// //   const handleFocus = async event =>{
// //     const data = await axios.get('http://192.168.2.102:3000/user/revtag/' + revTag);
// //     // console.log(data)
// //     console.log('focus')
// //   }
// const submitHandler = event =>{
//     event.preventDefault();
//     if(enteredNameIsValid && enteredRevTagIsValid){
//         console.log('siker')
//         resetNameInput()
//         resetRevTagInput()
//     }
// }
//   return (
//     <form onSubmit={submitHandler} className="container">
//       <input
//         placeholder="Name"
//         id="name"
//         name="name"
//         minLength="3"
//         autoFocus
//         value={enteredName}
//         onChange={nameChangedHandler}
//         onBlur={nameBlurHandler}
//       />
//       {nameInputHasError && <p className="">Name must not be empty.</p>}
//       <input
//         placeholder="@revtag"
//         id="revtag"
//         name="revtag"
//         pattern="[^@]*"
//         value={enteredRevTag}
//         onBlur={revTagBlurHandler}

//       />
//       {revTagInputHasError && <p className="">Rev Tag already used</p>}
//       <div>
//       <input
//       className="sbtn_with_h4"
//       type="submit"
//       value="Mentés"
//       />
//       </div>
      
//     </form>
//   );
// }
// // return(
// //     <div class="middle">
// // <form method="post">
// // <input required placeholder="Név" id="name" name="name" minlength="3" autofocus value="<%= (typeof user === 'undefined') ? '' : user.name%>" onchange="gencolor()">
// // <input required placeholder="@revtag" name="revtag" pattern="[^@]*" title="Nem kell a @ karaktert is megadnod" value="<%= (typeof user === 'undefined') ? '' : user.revtag%>">
// // <label>Szín</label>
// // <input required placeholder="@revtag" id="color" name="color" type="color" class="color" value="<%= (typeof user === 'undefined') ? '#D9515E' : user.color%>">
// // <div class="h5"></div>
// // <input class="sbtn_with_h4" type="submit" value="Mentés">
// // <a class="sbtn" href="/summary"><h4>Mégse</h4></a>
// // </form>
// // </div>
// // )
