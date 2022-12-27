import { Navigate } from "react-router-dom";
import SideNav from "../../components/SideNav";

import styles from "./Dashboard.module.css";

import profile__avatar from "../../assets/Icons/avatar.svg";
import search__icon from "../../assets/Icons/search.svg";

import filter__icon from "../../assets/Icons/filter.svg";
import { useState } from "react";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className={styles.wrapper}>
        <SideNav />
        <main className={styles.main}>
          <section className={styles.header}>
            <div className={styles.profile__intro}>
              <img
                className={styles.profile__avatar}
                src={profile__avatar}
                alt="profile avatar"
              />
              <p className={styles.username}>
                {user.user.username.toUpperCase()}
              </p>
            </div>
            <h1>Welcome to TheMaxibot Forex</h1>
          </section>
          <section className={styles.main__content}>
            <div className={styles.main__content__heading}>
              <h2>Running Bots</h2>
              <div className={styles.left__content}>
                <div className={styles.search__field}>
                  <img
                    className={styles.search__icon}
                    src={search__icon}
                    alt="search icon"
                  />
                  <input
                    className={styles.search__input}
                    type="text"
                    placeholder="Search list"
                  />
                </div>
                <img src={filter__icon} alt="filter icon" />
                <button onClick={() => setShowModal(true)} className={styles.new__bot}>Add new</button>
              </div>
              <table className={styles.table}>
                <thead className={styles.table__head}>
                  <th>#</th>
                  <th>Pairs</th>
                  <th>strategy</th>
                  <th>quantity</th>
                  <th>price</th>
                  <th>status</th>
                  <th></th>
                </thead>
                <tbody>
                  <tr className={styles.tr}>
                    <td>1</td>
                    <td>EURUSD</td>
                    <td>Grid</td>
                    <td>0.02</td>
                    <td>0.9789</td>
                    <td>Running</td>
                    <td></td>
                  </tr>
                  <tr className={styles.tr}>
                    <td>2</td>
                    <td>EURUSD</td>
                    <td>Grid</td>
                    <td>0.02</td>
                    <td>0.9789</td>
                    <td>Running</td>
                    <td></td>
                  </tr>
                  <tr className={styles.tr}>
                    <td>3</td>
                    <td>EURUSD</td>
                    <td>Grid</td>
                    <td>0.02</td>
                    <td>0.9789</td>
                    <td>Running</td>
                    <td></td>
                  </tr>
                  <tr className={styles.tr}>
                    <td>4</td>
                    <td>EURUSD</td>
                    <td>Grid</td>
                    <td>0.02</td>
                    <td>0.9789</td>
                    <td>Running</td>
                    <td></td>
                  </tr>
                  <tr className={styles.tr}>
                    <td>5</td>
                    <td>EURUSD</td>
                    <td>Grid</td>
                    <td>0.02</td>
                    <td>0.9789</td>
                    <td>Running</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <Modal title="New Bot" show={showModal} close={() => setShowModal(false)} >
        <h2>This is a modal</h2>
      </Modal>
    </>
  );
};

export default Dashboard;
