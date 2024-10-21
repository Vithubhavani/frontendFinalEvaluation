const ValidateForm=(name,email,password,confirmPassword)=>{
    let valid=true
    let invalid={
        name:false,
        email:false,
        password:{
          lengths: false,
          specialChar: false,
          Upppercases: false,
        },
        confirmPassword:false
    }

    if(!name|| !email || !password || !confirmPassword){
        valid=false
        invalid={
            name:!name,
            email:!email,
            password:{
            lengths: !password,
            specialChar: !password,
            Upppercases: !password,
      },
        confirmPassword:!confirmPassword
        }
    }


  const emailReg=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordLengthReg = /.{8,}/;
  const passwordSpecialCharReg = /[!@#$%^&*]/;
  const passwordUppercaseReg = /[A-Z]/;

  if (!emailReg.test(email)) {
    invalid.email = true;
    valid = false;
  }

 
  if (!passwordLengthReg.test(password)) {
    invalid.password.lengths = true;
    valid = false;
  }
  if (!passwordSpecialCharReg.test(password)) {
    invalid.password.specialChar = true;
    valid = false;
  }
  if (!passwordUppercaseReg.test(password)) {
    invalid.password.Upppercases = true;
    valid = false;
  }

  
  if (password !== confirmPassword) {
    invalid.confirmPassword = true;
    valid = false;
  }
        return{
           valid,
           invalid
        }
}

export default ValidateForm;