import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateResumeData } from "@/Services/GlobalApi";
import { updateThisResume } from "@/Services/resumeAPI";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  const colors = [
    "#000000", // Black (added)
    "#9C27B0", // Purple
    "#7B1FA2", // Dark Purple
    "#6A1B9A", // Deeper Purple
    "#4A148C", // Darkest Purple
    "#673AB7", // Deep Purple
    "#3F51B5", // Indigo
    "#2196F3", // Blue
    "#00BCD4", // Cyan
    "#009688", // Teal
    "#4CAF50", // Green
    "#8BC34A", // Light Green
    "#CDDC39", // Lime
    "#FFEB3B", // Yellow
    "#FFC107", // Amber
    "#FF9800", // Orange
    "#FF5722", // Deep Orange
    "#F44336", // Red
    "#E91E63", // Pink
    "#C2185B", // Dark Pink
    "#00BCD4", // Teal Accent
  ];

  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || colors[0]);
  const { resume_id } = useParams();
  const onColorSelect = async (color) => {
    setSelectedColor(color);
    dispatch(
      addResumeData({
        ...resumeInfo,
        themeColor: color,
      })
    );
    const data = {
      data: {
        themeColor: color,
      },
    };
    await updateThisResume(resume_id, data)
      .then(() => {
        toast.success("Theme Color Updated");
      })
      .catch((error) => {
        toast.error("Error updating theme color");
      });
    // console.log(" COlor Data to be updated", data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          <div 
            className="w-4 h-4 rounded-full mr-1 border border-gray-400" 
            style={{ 
              backgroundColor: selectedColor || "#000000",
              borderColor: selectedColor === "#000000" ? "white" : "gray",
              borderWidth: selectedColor === "#000000" ? "2px" : "1px"
            }}
          ></div>
          <Palette /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border-2
             ${selectedColor === item ? "border-black" : "border-white"}
             `}
              style={{
                background: item,
                borderColor: item === "#000000" ? "white" : selectedColor === item ? "black" : "#e5e5e5",
                boxShadow: item === "#000000" ? "0 0 0 1px #888" : "none"
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
