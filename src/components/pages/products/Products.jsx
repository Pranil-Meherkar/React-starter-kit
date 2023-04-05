import React, { useState, useEffect } from "react";
import "./Products.css";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialogue from "./Dialog";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal";
import { deleteRequest, get, post, put } from "../../../services/publicRequest";
import { PRODUCT } from "../../../services/apiEndpoints";
import { toast } from "react-toastify";

const initialValue = { name: "", karat: "", weight: "", price: "", image: "" };
function Home() {
  const [tableData, setTableData] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    get(PRODUCT).then((resp) => setTableData(resp.data));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    tableData && tableData.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleFormSubmit = () => {
    if (formData.id) {
      put(PRODUCT, formData.id, formData).then((resp) => {
        toast.success("Product updated successfully");
        handleClose();
        getUsers();
      });
    } else {
      post(PRODUCT, formData).then((resp) => {
        console.log("resp" + JSON.stringify(resp.data.name.length));

        handleClose();
        getUsers();
        toast.success("Product added succesfully");
      });
    }
  };

  // const handleDelete = (id) => {
  //   const confirm = window.confirm(
  //     "Are you sure you want to delete this row",
  //     id
  //   );
  //   if (confirm) {
  //     deleteRequest(PRODUCT, id)
  //       .then((resp) =>{
  //         getUsers()
  //         toast.success("Product deleted successfully")
  //       });
  //   }
  // };

  const deleteProduct = (id) => {
    deleteRequest(PRODUCT, id).then((resp) => {
      getUsers();
      toast.success("Product deleted successfully");
    });
  };

  const handleUpdate = (data) => {
    setFormData(data);
    handleClickOpen();
  };

  const removeImage = (image) => {
    console.log("mmmmm" + tableData);

    setFormData({
      ...formData,
      image: "",
    });
  };

  const onChange = (e, err) => {
    e.preventDefault();
    if (e.target.name == "name") {
      e.target.value.length === 0 ? err(true) : err(false);
    }

    if (e.target.name == "karat") {
      e.target.value > 24 ? err(true) : err(false);
    }

    if (e.target.name == "weight") {
      e.target.value.length === 0 ? err(true) : err(false);
    }

    if (e.target.name == "price") {
      e.target.value.length === 0 ? err(true) : err(false);
    }

    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

      image: e.target.type === "file" && "./" + e.target.files[0].name,
    });
    console.log(" e.target" + value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const selectPageHandler = (selectedPage) => {
    console.log("*********" + selectedPage);
    if (selectedPage >= 1 && selectedPage <= tableData.length / 5)
      setCurrentPage(selectedPage);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tableData.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        className="products-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "7vh 5vw",
          borderRadius: "5px",
          fontSize: "2rem",
        }}
      >
        <p className="products-heading">Products Data</p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-around",
          }}
        >
          <Button
            size="small"
            style={{ height: "8.1vh" }}
            className="btn-addproduct mb-2"
            onClick={handleClickOpen}
            variant="outlined"
            startIcon={<AddIcon size="small" />}
          >
            Add Product
          </Button>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-sm btn-outline-primary text-start mb-2"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="DOWNLOAD AS XLS"
          />
        </div>

        {/* <button onClick={handleAdd} className="add-role" >Add Role</button> */}
      </div>

      <div>
        <table
          id="table-to-xls"
          className="table table-bordered caption-top producttable"
        >
          <thead>
            <tr>
              <th className="head1" scope="col-lg-1">
                IMAGE UPLOADED
              </th>
              <th className="head" scope="col">
                ID
              </th>
              <th className="head" scope="col">
                NAME
              </th>
              <th className="head" scope="col">
                CARAT
              </th>
              <th className="head" scope="col">
                WEIGHT
              </th>
              <th className="head" scope="col">
                PRICE
              </th>
              <th className="head" scope="col">
                IMAGE
              </th>
              <th className="head" scope="col">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts &&
              currentProducts.map((item) => (
                <tr key={item?.id}>
                  <>
                    <th scope="row">
                      {" "}
                      <input
                        type="checkbox"
                        checked={item.image ? true : false}
                      />
                    </th>

                    <th className="head-id" scope="row">
                      {item?.id}
                    </th>
                    <td>{item?.name}</td>
                    <td>{item?.karat}</td>
                    <td>{item?.weight}</td>
                    <td>{item?.price}</td>
                    <td>
                      <img
                        src={item.image.length > 0 ? item.image : ""}
                        height="20px"
                      />
                    </td>
                    <td>
                      <div style={{display:"flex", justifyContent:"center"}}>
                        <ConfirmDeleteModal
                          id={item.id}
                          handleDelete={deleteProduct}
                        />

                        <EditIcon
                          className="editicon"
                          onClick={() => handleUpdate(item)}
                          size="small"
                          color="primary"
                        />
                      </div>
                    </td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
        <FormDialogue
          open={open}
          handleClose={handleClose}
          data={formData}
          onChange={onChange}
          handleFormSubmit={handleFormSubmit}
          setTableData={setTableData}
          removeImage={removeImage}
        />

        <div>
          <nav className="pagination pagination-sm">
            <ul>
              <span
                onClick={() => selectPageHandler(currentPage - 1)}
                className={currentPage > 1 ? "" : "pagination__disable"}
              >
                <ArrowBackIosIcon fontSize="5px" size="small" color="action" />
              </span>
              {pageNumbers.map((number, i) => (
                <>
                  <li key={number} className="page-item">
                    <NavLink
                      onClick={() => paginate(number)}
                      href="!#"
                      className={[
                        "page-link",
                        currentPage === i + 1 ? "pagination__selected" : "",
                      ].join(" ")}
                    >
                      {number}
                    </NavLink>
                  </li>
                </>
              ))}
              <span
                onClick={() => selectPageHandler(currentPage + 1)}
                className={
                  currentPage < Math.ceil(tableData.length / productsPerPage)
                    ? ""
                    : "pagination__disable"
                }
              >
                <ArrowForwardIosIcon
                  fontSize="5px"
                  color="action"
                  size="small"
                />
              </span>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Home;
