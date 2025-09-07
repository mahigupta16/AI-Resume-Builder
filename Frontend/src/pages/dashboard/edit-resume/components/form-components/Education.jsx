import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateResumeData } from "@/Services/GlobalApi";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  institutionType: "University", // New field to distinguish between University and School
  institutionName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};
function Education({ resumeInfo, enanbledNext }) {
  const [educationalList, setEducationalList] = React.useState(
    resumeInfo?.education || [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
  }, [educationalList]);

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formFields }]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    if (educationalList.length === 0) {
      return toast("Please add atleast one education", "error");
    }
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Education");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (index, key, value) => {
    const list = [...educationalList];
    const newListData = {
      ...list[index],
      [key]: value,
    };
    list[index] = newListData;
    setEducationalList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    handleChange(index, name, value);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>Institution Type</label>
                <div className="flex gap-4 my-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`institutionType-${index}`}
                      value="University"
                      checked={item?.institutionType === "University"}
                      onChange={() => handleChange(index, "institutionType", "University")}
                    />
                    University
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`institutionType-${index}`}
                      value="School"
                      checked={item?.institutionType === "School"}
                      onChange={() => handleChange(index, "institutionType", "School")}
                    />
                    School
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label>{item?.institutionType === "School" ? "School Name" : "University Name"}</label>
                <Input
                  name="institutionName"
                  onChange={(e) => handleInputChange(e, index)}
                  defaultValue={item?.institutionName}
                />
              </div>
              <div>
                <label>{item?.institutionType === "School" ? "Certificate/Diploma" : "Degree"}</label>
                <Input
                  name="degree"
                  onChange={(e) => handleInputChange(e, index)}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <label>{item?.institutionType === "School" ? "Field of Study" : "Major"}</label>
                <Input
                  name="major"
                  onChange={(e) => handleInputChange(e, index)}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleInputChange(e, index)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleInputChange(e, index)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Grade</label>
                <div className="flex justify-center items-center gap-4">
                  <select
                    name="gradeType"
                    className="py-2 px-4 rounded-md"
                    onChange={(e) => handleInputChange(e, index)}
                    value={item?.gradeType}
                  >
                    <option value="CGPA">CGPA</option>
                    <option value="GPA">GPA</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                  <Input
                    type="text"
                    name="grade"
                    onChange={(e) => handleInputChange(e, index)}
                    defaultValue={item?.grade}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleInputChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
