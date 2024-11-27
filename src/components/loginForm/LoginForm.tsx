import { useFormik } from "formik";
import MyButton from "../myButton/MyButton";
import MyInput from "../myInput/MyInput";
import "./loginForm.css";
import { useAuth } from "../../context/weatherContext";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const { setUser } = useAuth();
  
  const schema = Yup.object().shape({
    username: Yup
      .string()
      .required('username is required'),
    password: Yup
      .string()
      .min(6, 'password is more than 6')
      .required('password is required')
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: 'emilys',
      password: 'emilyspass'
    },
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (values, {resetForm}) => {
      //console.log(values)
      
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      })
        .then(res => res.json())
        .then(data => {
          setUser(data)
          resetForm()
          //-- Сохранить данные в browser
          localStorage.setItem('accessToken', data.accessToken)
          navigate('/')
        });
    }
  });
  
  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
      <MyInput onChange={formik.handleChange} value= {formik.values.username} name={"username"}  type={"text"} label={"Type your username"} placeholder={"login"} />
      <span className="error">{formik.errors.username}</span>
      <MyInput onChange={formik.handleChange} value= {formik.values.password}  name={"password"} type={"password"} label={"Type your password:"} placeholder={"password"} />
      <span className="error">{formik.errors.password}</span>
      <MyButton myType={"submit"} text={"submit"} isDanger={false} />
    </form>
  );
}

export default LoginForm;
