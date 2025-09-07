import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

// Updated prompt to explicitly request experience levels in the correct format
const prompt =
  "Job Title: {jobTitle} , Give me list of summaries for 3 experience levels: Senior Level, Mid Level, and Fresher Level in 3-4 lines each. Return in JSON format with an array of objects, each containing 'summary' and 'experience_level' fields. The experience_level MUST be one of exactly these strings: 'Senior Level', 'Mid Level', or 'Fresher Level'.";

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Started Saving Summary");
    const data = {
      data: { summary },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          enanbledNext(true);
          enanbledPrev(true);
          setLoading(false);
        });
    }
  };

  const setSummery = (summary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summary,
      })
    );
    setSummary(summary);
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    console.log("Generate Summery From AI for", resumeInfo?.jobTitle);
    if (!resumeInfo?.jobTitle) {
      toast("Please Add Job Title");
      setLoading(false);
      return;
    }
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = result.response.text();
      console.log("AI Response:", responseText);
      
      try {
        // Try to parse the response as JSON
        let parsedData;
        try {
          parsedData = JSON.parse(responseText);
        } catch (jsonError) {
          // If direct parsing fails, try to extract JSON from the text
          const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("Could not extract JSON from response");
          }
        }
        
        // Handle different response formats
        let summaryList = [];
        
        if (Array.isArray(parsedData)) {
          // Direct array of summaries
          summaryList = parsedData;
        } else if (parsedData.summaries && Array.isArray(parsedData.summaries)) {
          // Object with summaries array
          summaryList = parsedData.summaries;
        } else if (parsedData.data && Array.isArray(parsedData.data)) {
          // Object with data array
          summaryList = parsedData.data;
        } else {
          // Single object or other format - create default levels
          summaryList = [
            { experience_level: "Senior Level", summary: parsedData.summary || responseText },
            { experience_level: "Mid Level", summary: "A mid-level professional with growing expertise in this field." },
            { experience_level: "Fresher Level", summary: "An entry-level professional eager to apply academic knowledge." }
          ];
        }
        
        // Ensure each item has the required fields with valid experience levels
        summaryList = summaryList.map(item => {
          if (typeof item === 'string') {
            return { experience_level: "Senior Level", summary: item };
          }
          
          // Ensure experience_level is one of the valid options
          let level = item.experience_level || "";
          if (!['Senior Level', 'Mid Level', 'Fresher Level'].includes(level)) {
            // Assign a default level based on position in the array if possible
            if (summaryList.length === 3) {
              const index = summaryList.indexOf(item);
              level = index === 0 ? "Senior Level" : index === 1 ? "Mid Level" : "Fresher Level";
            } else {
              level = "Senior Level"; // Default fallback
            }
          }
          
          return {
            experience_level: level,
            summary: item.summary || (typeof item === 'object' ? JSON.stringify(item) : String(item))
          };
        });
        
        setAiGenerateSummeryList(summaryList);
        toast("Summary Generated", "success");
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        // Create a fallback summary list with the raw response
        const fallbackList = [
          { experience_level: "Senior Level", summary: responseText },
          { experience_level: "Mid Level", summary: "A mid-level professional with growing expertise in this field." },
          { experience_level: "Fresher Level", summary: "An entry-level professional eager to apply academic knowledge." }
        ];
        setAiGenerateSummeryList(fallbackList);
        toast("Generated summary with basic formatting", "info");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast("Error generating summary", `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary ? summary : resumeInfo?.summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && Array.isArray(aiGeneratedSummeryList) && aiGeneratedSummeryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                enanbledNext(false);
                enanbledPrev(false);
                setSummery(item?.summary);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary || (typeof item === 'string' ? item : 'No summary available')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
