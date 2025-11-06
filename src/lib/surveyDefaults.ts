export type SurveyDefinition = Record<string, unknown>;

export const SURVEY_STORAGE_KEY = "buuk-active-survey";

export const defaultSurveyDefinition: SurveyDefinition = {
  title: "Dubai Community Pulse",
  description:
    "Understand sentiment across key districts ahead of the Expo follow-up program.",
  logoPosition: "right",
  logoWidth: 120,
  completedHtml:
    "<div class='completion-message'><h2>Shukran!</h2><p>We appreciate your time in sharing feedback.</p></div>",
  pages: [
    {
      name: "intro",
      navigationTitle: "Overview",
      elements: [
        {
          type: "image",
          name: "skyline",
          imageLink:
            "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=900&q=60",
          imageHeight: 200,
          imageFit: "cover",
        },
        {
          type: "html",
          name: "welcome",
          html: "<h3>Welcome to the Dubai Community Pulse study</h3><p>Answer a few quick questions so we can tailor city services for you.</p>",
        },
      ],
    },
    {
      name: "experience",
      elements: [
        {
          type: "rating",
          name: "overallExperience",
          title: "How would you rate your recent experience with city services?",
          rateType: "smileys",
          minRateDescription: "Needs work",
          maxRateDescription: "Excellent",
          isRequired: true,
        },
        {
          type: "matrix",
          name: "serviceMatrix",
          title: "Tell us how satisfied you are with each touchpoint",
          columns: [
            { value: 1, text: "Very dissatisfied" },
            { value: 2, text: "Dissatisfied" },
            { value: 3, text: "Neutral" },
            { value: 4, text: "Satisfied" },
            { value: 5, text: "Very satisfied" },
          ],
          rows: [
            { value: "digitalServices", text: "Digital channels" },
            { value: "fieldAgents", text: "Field teams" },
            { value: "serviceCenters", text: "Service centers" },
          ],
        },
      ],
    },
    {
      name: "logic",
      elements: [
        {
          type: "radiogroup",
          name: "wantsFollowUp",
          title: "Would you like a follow-up call?",
          isRequired: true,
          choices: [
            { value: "yes", text: "Yes, please" },
            { value: "no", text: "No, thanks" },
          ],
        },
        {
          type: "comment",
          name: "openFeedback",
          title: "Anything else you want us to know?",
          visibleIf: "{overallExperience} <= 3",
          placeholder: "Share more details so we can improve",
          maxLength: 300,
        },
        {
          type: "panel",
          name: "followUpPanel",
          visibleIf: "{wantsFollowUp} = 'yes'",
          title: "Tell us how we can reach you",
          elements: [
            {
              type: "text",
              name: "contactName",
              title: "Name",
              isRequired: true,
            },
            {
              type: "text",
              name: "contactPhone",
              title: "Phone number",
              inputMask: "(999) 999-9999",
              isRequired: true,
            },
            {
              type: "dropdown",
              name: "bestTime",
              title: "Best time to reach you",
              choices: ["Morning", "Afternoon", "Evening"],
            },
          ],
        },
      ],
    },
  ],
  triggers: [
    {
      type: "setvalue",
      expression: "{overallExperience} <= 2",
      setToName: "priorityFlag",
      setValue: true,
    },
  ],
  calculatedValues: [
    {
      name: "npsScore",
      expression: "{overallExperience} = 5 ? 10 : {overallExperience} = 4 ? 8 : {overallExperience} = 3 ? 0 : -10",
    },
  ],
};
