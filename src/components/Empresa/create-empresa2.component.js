
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.css";

class CreateEmpresa2 extends React.Component {
    render() {

        const validationSchema = Yup.object().shape({
            razao_social: Yup.string()
                .min(2, "*Names must have at least 2 characters")
                .max(100, "*Names can't be longer than 100 characters")
                .required("*razao_social is required"),
            numero_inscricao: Yup.string()
                .required("*Numero de inscricao is required"),

            data_criacao: Yup.string()
                .required("*data_criacao required")
        });
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Cadastro de empresa</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <Formik
                            initialValues={{ razao_social: "popopo", numero_inscricao: "123123", data_criacao: "2121-12-09" }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                // When button submits form and form is in the process of submitting, submit button is disabled
                                setSubmitting(true);
                                console.log(values)
                                try {
                                    await axios.post('http://127.0.0.1:8080/api/empresas/', values)
                                        .then(res => console.log(res.data));

                                    alert('salvo com sucesso');
                                    resetForm();
                                    setSubmitting(false);

                                } catch (error) {
                                    setSubmitting(false);
                                    alert('Erro ao gravar ');
                                }



                            }
                            }


                        >
                            {({ touched, errors, isSubmitting, values, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                type="text"
                                                name="razao_social"
                                                placeholder="Enter razao_social"
                                                className={`form-control ${
                                                    touched.razao_social && errors.razao_social ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="razao_social"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group col">
                                            <label htmlFor="numero_inscricao">numero_inscricao</label>
                                            <Field
                                                type="text"
                                                name="numero_inscricao"
                                                placeholder="Enter numero_inscricao"
                                                className={`form-control ${
                                                    touched.numero_inscricao && errors.numero_inscricao ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="numero_inscricao"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="data_criacao">numero_inscricao</label>
                                            <Field
                                                type="date"
                                                name="data_criacao"
                                                placeholder="Enter data_criacao"
                                                className={`form-control ${
                                                    touched.data_criacao && errors.data_criacao ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="data_criacao"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Please wait..." : "Submit"}
                                        </button>
                                        {JSON.stringify(values, null, 2)}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateEmpresa2