import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

// API
import { fetchJobsLatest } from "../../../api/jobicy.api";

// Types
import { TJobModalInfo } from "../../../app/types/Job.type";
import { EUserStatus } from "../../../app/types/User.type";

// Components
import JobModal from "./JobModal.component";
import useAuthContext from "../../../hooks/useAuthContext.hook";

export default function JobList() {
  const { authUser } = useAuthContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchJobsLatest(),
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (_: unknown, id: number) => {
    if (authUser?.status === EUserStatus[EUserStatus.paid]) {
      const job = jobs?.find((j) => j.id === id);

      if (!job) return;

      const info: TJobModalInfo = {
        title: job.jobTitle,
        geo: job.jobGeo,
        salaryCurrency: job.salaryCurrency ?? "N/A",
        industry: job.jobIndustry,
      };

      setJobInfo(info);
      setModal(true);
    } else {
      enqueueSnackbar("Feature not available for Free Users", {
        variant: "info",
      });
    }
  };

  const visibleRows = useMemo(
    () =>
      jobs
        ? [...jobs].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [jobs, page, rowsPerPage]
  );

  const [modal, setModal] = useState(false);
  const [jobInfo, setJobInfo] = useState<TJobModalInfo>({
    title: "",
    geo: "",
    salaryCurrency: "",
    industry: [""],
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Job Title</TableCell>
              <TableCell align="right" className="font-bold">
                Company Name
              </TableCell>
              <TableCell align="right" className="font-bold">
                Job Type
              </TableCell>
              <TableCell align="right" className="font-bold">
                Job Level
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((job, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  onClick={(event) => handleClick(event, job.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={job.id}
                  className={[
                    "cursor-pointer hover:bg-sky-100",
                    index % 2 ? "bg-gray-50" : "",
                  ].join(" ")}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    {job.jobTitle}
                  </TableCell>
                  <TableCell align="right">{job.companyName}</TableCell>
                  <TableCell align="right">{job.jobType}</TableCell>
                  <TableCell align="right">{job.jobLevel}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="w-full flex justify-center py-10">
            <CircularProgress color="inherit" />
          </div>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={authUser?.status === 'paid' ? [10, 20, 50] : [0]}
        component="div"
        count={jobs?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <JobModal modal={modal} setModal={setModal} jobInfo={jobInfo} />
    </>
  );
}
