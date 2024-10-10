"use client"
import { useState } from "react";
import ProjectFormContainer from "@/components/custom/mutlistep-project-form/project-form-container";
import { Provider } from "@/components/custom/mutlistep-project-form/form-context";
export default function Page() {
  const [data, setData] = useState({
    title: "",
    description: "",
    startdate: "",
    enddate: "",
  })
  return (
    <Provider value={{ data, setData }}>
      <ProjectFormContainer />
    </Provider>
  )
}
