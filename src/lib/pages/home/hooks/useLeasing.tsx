import { useState } from "react";

import {
  LeasingEntryProps,
  LeasingFinalOutputProps,
  LeasingInitialOutputProps,
  LeasingTableProps,
} from "lib/@core/interfaces/leasing";
import {
  DEMO_ENTRY_DATA,
  DEMO_FINAL_OUTPUT_DATA,
  DEMO_INITIAL_OUTPUT_DATA,
} from "lib/@core/utils/states";
import { useFormik } from "formik";
import {
  calculateFinalOutputResults,
  calculateInitialOutputResults,
  calculateTableResults,
  recalculateTableResults,
} from "lib/@core/helpers/calculations";
import { saveLeasingToFirestore } from "lib/@core/firebase";

const useLeasing = () => {
  const [initialOutputResultsState, setInitialOutputResults] =
    useState<LeasingInitialOutputProps>(DEMO_INITIAL_OUTPUT_DATA);
  const [finalOutputResultsState, setFinalOutputResultsState] =
    useState<LeasingFinalOutputProps>(DEMO_FINAL_OUTPUT_DATA);
  const [tableResults, setTableResults] = useState<LeasingTableProps[]>([]);

  const [hasResults, setHasResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leasingSavedState, setLeasingSavedState] = useState({
    isSaved: false,
    isSaving: false,
  });

  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const formik = useFormik({
    initialValues: DEMO_ENTRY_DATA as LeasingEntryProps,
    onSubmit: async (data: LeasingEntryProps) => {
      await wait(1);

      // LeasingInitialOutputProps
      const initialOutputResults = calculateInitialOutputResults(data);
      // LeasingTableProps[]
      const table_results = calculateTableResults(data, initialOutputResults);
      // : LeasingFinalOutputProps
      const finalOutputResults = calculateFinalOutputResults(
        data,
        table_results
      );

      setInitialOutputResults(initialOutputResults);
      setFinalOutputResultsState(finalOutputResults);
      setTableResults(table_results);
      setHasResults(true);
    },
    validate: (values: LeasingEntryProps) => {
      const errors: any = {};
      for (const [key, value] of Object.entries(values)) {
        if (!value) {
          errors[key] = "Requerido";
        }
      }
      return errors;
    },
  });

  const formHandleChange = (e: any, id: string) => {
    setHasResults(false);
    setTableResults([]);
    setLeasingSavedState({
      isSaved: false,
      isSaving: false,
    });
    formik.setFieldValue(id, parseFloat(e));
  };

  const gracePeriodHandleChange = (value: any) => async (index: any) => {
    const tableResultsCopy = [...tableResults];
    tableResultsCopy[index].periodoGracia = value;

    setLoading(true);
    await wait(1);

    const newTableResults = recalculateTableResults(
      tableResultsCopy,
      formik.values,
      initialOutputResultsState
    );
    const results = calculateFinalOutputResults(formik.values, newTableResults);

    setTableResults(newTableResults);
    setFinalOutputResultsState(results);
    setLoading(false);
  };

  const saveLeasing = async (values: any) => {
    setLeasingSavedState({
      ...leasingSavedState,
      isSaving: true,
    });
    await saveLeasingToFirestore(
      values,
      formik.values,
      initialOutputResultsState,
      finalOutputResultsState,
      tableResults
    );
    setLeasingSavedState({
      ...leasingSavedState,
      isSaving: false,
      isSaved: true,
    });
  };

  return {
    formik,
    initialOutputResultsState,
    finalOutputResultsState,
    tableResults,
    hasResults,
    loading,
    leasingSavedState,
    formHandleChange,
    gracePeriodHandleChange,
    saveLeasing,
  };
};

export default useLeasing;
