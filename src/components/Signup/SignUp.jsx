import React, { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
export default function SignUp() {
  let navigate = useNavigate();
  const [errorMassage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(false);

  async function sendData(values) {
    setloading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        console.log(err, err.response.request.status);
        if (err.response.request.status >= 400) {
          setErrorMessage("refresh your tab and try again pls ");
        } else {
          setErrorMessage(err.response.data.message);
        }
        setloading(false);
        Swal.fire({
          text: errorMassage,
          icon: "error",
        });
      });
    if (data.message === "success") {
      navigate("/login");
    }
    setloading(false);
    console.log(data.message);
  }
  const mySchema = yup.object({
    name: yup
      .string()
      .max(15, "max length is 15 char")
      .min(3, "min length is 3")
      .required("pls enter your name"),
    email: yup
      .string()
      .email("enter a valid email pls ")
      .required("pls enter your email"),
    phone: yup
      .string()
      .required("pls enter your phone ")
      .matches(/^01[0125][0-9]{8}$/, "enter a valid phone number pls "),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^[A-z][a-z0-9]{4,}$/,
        "pls enter min 4 char one of them Capital"
      ),
    rePassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: sendData,
  });

  return (
    <div className="w-75 mx-auto my-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>sign Up</title>
      </Helmet>
      <h3>Register now </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-control"
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">password:</label>
            <input
              type="password"
              id="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="rePassword">rePassword:</label>
            <input
              type="password"
              id="rePassword"
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone">phone:</label>
            <input
              type="tel"
              id="phone"
              onBlur={formik.handleBlur}
              value={formik.phone}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : (
              ""
            )}
          </div>
          {loading ? (
            <button className="btn btn-success d-block ms-auto">
              <i className=" fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success d-block ms-auto"
              disabled={!(formik.isValid && formik.dirty)}
            >
              register now
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
