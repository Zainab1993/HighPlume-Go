import React, { Component } from "react";
import "../App.css";
import $ from "jquery";
import axios from "axios";
var sectionName = [];
class section extends Component {
  constructor() {
    super();
    this.state = {
      section_name: "",
      section_desc: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    var divHtml = "";

    axios
      .post("http://18.222.16.46/createSection/getSectionInfo")
      .then(response => {
        console.log(response);
        sectionName = response.data.sectionLocalData;
        divHtml += "<thead  id='thead'>";
        divHtml += " <th style='width:50%' id=''>Row</th>";
        divHtml += " <th style='width:50%'>Section Name</th>";
        divHtml += "</thead><tbody class=''>";
        for (var i = 0; i < sectionName.length; i++) {
          divHtml += "<tr>";
          divHtml += "<th style='width:50%'>" + i + "</th>";
          divHtml +=
            "<td style='width:50%' >" + sectionName[i].section_name + "</td>";
          divHtml +=
            "<td style='width:50%'><a   class='btn' style='border:none' id='btn2'><i class='fas fa-edit'></i></a></td>";
          divHtml +=
            "<td style='width:50%'><a  class='btn' style='border:none' id='btn3'><i class='fas fa-trash-alt'></i></a></td>";
          divHtml += "</tr>";
        }
        divHtml += "</tbody>";

        document.getElementById("table").innerHTML = divHtml;

        $("#table tbody").on("click", "#btn2", function() {
          debugger;
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          console.log(uid);
          sessionStorage.setItem("sectionName", uid);
          window.location.replace("/sectionEdit");
        });

        $("#table tbody").on("click", "#btn3", function() {
          debugger;
          var rowIndex = $(this).closest("tr");
          var uid = $.trim(
            $(rowIndex)
              .find("td:eq(0)")
              .text()
          );
          var sec_id = "";
          for (var i = 0; i < sectionName.length; i++) {
            if (uid == sectionName[i].section_name) {
              sec_id = sectionName[i]._id;
            }
          }
          console.log(sec_id);

          const tempData = {
            _id: sec_id
          };
          axios
            .post("http://18.222.16.46/createSection/deleteSection", tempData)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error.response);
            });

          var index = $(this)
            .closest("tr")
            .index();
          console.log(uid);
          console.log(index);
          rowIndex = $(this)
            .closest("tr")
            .remove();
          //window.location.replace("/sectionEdit");
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  onSubmit(e) {
    this.props.history.push(`/createSection`);
  }

  render() {
    //goToTop();
    return (
      <div className="promos">
        <h1>List Of All Sections</h1>
        <nav className="main-menu">
          <ul>
            <li>
              <a href="/admin" style={{ marginTop: "30%" }}>
                <i class="fas fa-home fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Home</b>
                </span>
              </a>
            </li>

            <li>
              <a href="/showQuestions" style={{ marginTop: "10%" }}>
                <i class="fas fa-plus-square fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Add Questions</b>
                </span>
              </a>
            </li>

            <li style={{ marginTop: "10%" }}>
              <a href="/section">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section</b>
                </span>
              </a>
            </li>
            <li className="has-subnav" style={{ marginTop: "10%" }}>
              <a href="/category">
                <i class="fas fa-edit fa-2x" />
                <span className=" nav-text" style={{ color: "white" }}>
                  <b>Category</b>
                </span>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/templateSelection">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Template</b>
                </span>
              </a>
            </li>

            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/registerCustomer">
                <i class="fas fa-user-plus fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Register User</b>
                </span>
              </a>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Logout</b>
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <table
          className="table table-light"
          id="table"
          style={{ marginTop: "10%" }}
        />
        <button onClick={() => this.onSubmit()}>
          <img src="https://img.icons8.com/metro/26/000000/plus-math.png" />
        </button>
      </div>
    );
  }
}

export default section;
