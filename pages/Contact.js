import React, { useState } from "react";
import styles from "../styles/Contact.module.css";
const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");
  const handelSumbit = (e) => {
    e.preventDefault();
    const data = { phone, name, email, desc };
    fetch("http://localhost:3000/api/postcontact/", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success", data);
        alert("Sumbited");
        setphone("");
        setemail("");
        setdesc("");
        setname("");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  const handelchange = (e) => {
    if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "desc") {
      setdesc(e.target.value);
    } else if (e.target.name == "name") {
      setname(e.target.value);
    }
  };
  return (
    <div className={styles.contanier}>
      <h1>Contact us</h1>
      <form onSubmit={handelSumbit}>
        <div className={styles.mb3}>
          <label for="name" class={styles.formlable}>
            Enter your name
          </label>
          <input
            type="text"
            class={styles.input}
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={name}
            onChange={handelchange}
          />
        </div>
        <div className={styles.mb3}>
          <label for="email" class={styles.formlable}>
            Email address
          </label>
          <input
            type="email"
            class={styles.input}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handelchange}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label for="phone" class={styles.formlable}>
            Phone
          </label>
          <input
            type="phone"
            class={styles.input}
            id="phone"
            name="phone"
            value={phone}
            onChange={handelchange}
          />
        </div>
        <div className={styles.formlable}>
          <div class="form-floating">
            <textarea
              class={styles.input}
              placeholder="Write your concern"
              id="desc"
              value={desc}
              name="desc"
              onChange={handelchange}
            ></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
