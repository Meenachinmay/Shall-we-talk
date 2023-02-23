import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type RegisterProps = {

}

const Register: React.FC<RegisterProps> = () => {
 const { email, key } = useParams()
 const navigate = useNavigate()

  return (
    <div>hello world</div>
  )
};

export default Register;