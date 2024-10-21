const ValidateLogin=(email,password)=>{
    let valid=true
    let invalid={
        email:false,
        password:false  
    }

    if( !email || !password ){
        valid=false
        invalid={
            email:!email,
            password:!password
        }
    }

    return{
           valid,
           invalid
        }
}

export default  ValidateLogin;