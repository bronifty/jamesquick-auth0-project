import React from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts.js";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
