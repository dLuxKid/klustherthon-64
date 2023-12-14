import { useState } from "react";
import { usersUrl } from "../utils/urls";
import { useAuthContext } from "../context/useAuthContext";
import { toast } from "sonner";

export default function useManageBusinessStaff() {
  const [businessStaffs, setBusinessStaffs] = useState<any>();
  const [isLoadingBusinessStaffs, setIsLoadingBusinessStaffs] =
    useState<boolean>(false);
  const [businessStaffsErrMsg, setBusinessStaffsErrMsg] = useState<string>("");

  const { user } = useAuthContext();

  const fetchStaffs = async () => {
    setIsLoadingBusinessStaffs(true);
    setBusinessStaffs([]);
    try {
      //   const res = await fetch(`${usersUrl}/business/all-staffs/${user.id}`, {
      const res = await fetch(
        `http://localhost:5000/api/users/business/all-staffs/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setBusinessStaffs(data);
        setIsLoadingBusinessStaffs(false);
      } else {
        setBusinessStaffsErrMsg(data.message);
        toast.error(data.message);
        setIsLoadingBusinessStaffs(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setBusinessStaffsErrMsg("Error fetching all staffs");
      setIsLoadingBusinessStaffs(false);
    }
  };

  const verifyStaff = () => {};

  const unVerifyStaff = () => {};

  return {
    businessStaffs,
    businessStaffsErrMsg,
    isLoadingBusinessStaffs,
    fetchStaffs,
    verifyStaff,
    unVerifyStaff,
  };
}