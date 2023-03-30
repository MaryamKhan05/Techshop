// const RegisterCustomer=()=>{
//     isValidEmail(email)
//     if(email==''){return alert('Email Is Required')}
//     if(name==''){return alert('Name Is Required')}
//     if(PhoneNo==''){return alert('Contact No Is Required')}
//     if(password==''){return alert('Password Is Required')}
  
//     else{
//       createUserWithEmailAndPassword(email,password,auth).then(async(user)=>{
//         const uid= user.user.uid
//       await  AsyncStorage.setItem('UserType','Customer')
//       setDoc(doc(db,"Customers",uid),{
//         uid,
//         name,
//         email,
//         PhoneNo,
//         type: 'Customer'
//       })
//       }).then(()=>{
//         alert('User Registered')
//       }).catch((err)=>{alert('Something Went Wrong')})
//     }
//   }



//   const isValidEmail=(email)=>{
//     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const test= pattern.test(email);
// console.log("Email Is    ",test)
//   }