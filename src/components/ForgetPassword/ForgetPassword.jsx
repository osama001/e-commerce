import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
export default function ForgetPassword() {
  let [loading, setloading] = useState(false);
  let [errmessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  let schema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email pls"),
  });
  let sendCodeSchema = Yup.object({
    resetCode: Yup.string().required("email is required"),
  });

  async function SendCode(values) {
    setloading(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setloading(false);
      });
    if (data.statusMsg == "success") {
      document.querySelector(".getCode").classList.add("d-none");
      document.querySelector(".verifing").classList.remove("d-none");
    }
    console.log(data);
    setloading(false);
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: SendCode,
  });

  async function verfiyReset(values) {
    setloading(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        console.log(err);
        setloading(false)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        
          })
      });
    console.log(data);
    setloading(false);
    if (data.status == "Success") {
      navigate("/updatedPassword");
    }
  }

  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: sendCodeSchema,
    onSubmit: verfiyReset,
  });
  return (
    <>
      <div className="w-75 mx-auto my-5 getCode">
        <h3>please enter your email</h3>
        <form   onSubmit={formik.handleSubmit}>
          <div className="form-floating">
            <input
              type="email"
              value={formik.values.email}
              id="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email">email</label>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger my-3" role="alert">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="d-flex justify-content-center align-items-center  p-0">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <button
              className="btn-outline-success  ms-auto  btn d-block my-3"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              verify
            </button>
          )}
        </form>
      </div>

      <div className="w-75 mx-auto my-5 verifing d-none">
        <h3 className="text-center my-3"> enter your reset code</h3>
        <form onSubmit={formik2.handleSubmit} className="">
          <div className="form-floating">
            <input
              type="text"
              value={formik2.values.resetCode}
              id="resetCode"
              className="form-control"
              placeholder="name@example.com"
              onChange={formik2.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="resetCode">resetCode</label>
          </div>
          {formik2.touched.resetCode && formik2.errors.resetCode ? (
            <div className="alert alert-danger my-3" role="alert">
              {formik2.errors.email}
            </div>
          ) : (
            ""
          )}
          {errmessage ? (
            <div className="alert alert-danger my-3" role="alert">
              {errmessage}
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center  p-0">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <button
              className="btn-outline-success  ms-auto  btn d-block my-3"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Send Code
            </button>
          )}
        </form>
      </div>
    </>
  );
}
