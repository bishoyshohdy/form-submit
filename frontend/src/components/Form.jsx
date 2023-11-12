import React, { useState, useEffect  } from 'react';
import axios from 'axios';


import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

// const [selectedFile, setSelectedFile] = useState(null);

const handleFileUpload = (event) => {
  const fileUploaded = event.target.files[0];
  // setSelectedFile(fileUploaded);

  console.log(fileUploaded);
}




function ApplicationForm()  {
  const [selectedFile, setSelectedFile] = useState(null); // Define selectedFile state here
  const [resp, setResp] = useState(null);

  const handleFileUpload = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded);
    console.log(fileUploaded);
  };
  const toast = useToast();

  const [formData, setFormData] = useState({
    step1: {
      companyName: '',
      companyDescription: '',
      teamMembers: 1,
      teamMembersList: [{
        teamMemberNames: '',
        teamMemberRoles: '',
      }],
    },
    step2: {
      problem: '',
      solution: '',
      targetMarket: '',
      businessModel: null,
    },
    step3: {
      stageOfDevelopment: '',
    },
    step4: {
      pitchDeckLink: '',
      businessPlanLink: '',
      intellectualPropertyDescription: '',
      competitiveLandscapeDescription: '',
    },
    step5: {
      website: '',
      socialMediaLinks: '',
      videoPitchLink: '',
      technology:null,
    },

  });



  
  const handleNextStep = () => {
    // Perform input validation here
    if (validateInputs()) {
      setActiveStep(activeStep + 1);
    } else {
      // Display an error message or take appropriate action
      console.log('Please fill in all required fields before proceeding.');
    }
  };


const validateInputs = () => {
  // Implement your validation logic here
  // For example, check if all required fields in the current step are filled

  if (activeStep === 0) {
    const { companyName, companyDescription, teamMembers } = formData.step1;
    return companyName && companyDescription && teamMembers;
  } else if (activeStep === 1) {
    const { problem, solution, targetMarket, businessModel } = formData.step2;
    return problem && solution && targetMarket && businessModel;
  } else if (activeStep === 2) {
    const { stageOfDevelopment } = formData.step3;
    return stageOfDevelopment;
  }

  // Add additional conditions based on your form structure
  return true; // Default to true if no specific conditions are met
};


// const loadPreviousStepData = () => {

//   if (activeStep === 2) {
    
//     const { companyName, companyDescription, teamMembers } = formData.step1;
//     setFormData({
//       ...formData,
//       step1: {
//         companyName,
//         companyDescription,
//         teamMembers,
//       },
//     });
//     console.log(formData);
//   } else if (activeStep === 3) {
//     const { problem, solution, targetMarket, businessModel } = formData.step2;
//     setFormData({
//       ...formData,
//       step2: {
//         problem,
//         solution,
//         targetMarket,
//         businessModel,
//       },
//     });
//   } else if (activeStep === 4) {
//     const { stageOfDevelopment } = formData.step3;
//     setFormData({
//       ...formData,
//       step3: {
//         stageOfDevelopment,
//       },
//     });
//   } else if (activeStep === 5) {
//     const {
//       pitchDeckLink,
//       businessPlanLink,
//       intellectualPropertyDescription,
//       competitiveLandscapeDescription,
//     } = formData.step4;
//     setFormData({
//       ...formData,
//       step4: {
//         pitchDeckLink,
//         businessPlanLink,
//         intellectualPropertyDescription,
//         competitiveLandscapeDescription,
//       },
//     });
//   } else if (activeStep === 6) {
//     const { website, socialMediaLinks, videoPitchLink, technology } = formData.step5;
//     setFormData({
//       ...formData,
//       step5: {
//         website,
//         socialMediaLinks,
//         videoPitchLink,
//         technology,
//       },
//     });
//   }

// };




const handleBackStep = () => {
  if (activeStep > 0) {
    // loadPreviousStepData(); 
    setActiveStep(activeStep - 1); 
  }
};






const handleSubmit = () => {

  const formDataK = new FormData();
  formDataK.append('companyName', formData.step1.companyName);
  formDataK.append('companyDescription', formData.step1.companyDescription);
  formDataK.append('teamMembers', formData.step1.teamMembers);
  formDataK.append('teamMemberNames', formData.step1.teamMemberNames);
  formDataK.append('teamMemberRoles', formData.step1.teamMemberRoles);
  formDataK.append('problem', formData.step2.problem);
  formDataK.append('solution', formData.step2.solution);
  formDataK.append('targetMarket', formData.step2.targetMarket);
  formDataK.append('businessModel', formData.step2.businessModel);
  formDataK.append('stageOfDevelopment', formData.step3.stageOfDevelopment);
  formDataK.append('pitchDeckLink', formData.step4.pitchDeckLink);
  formDataK.append('businessPlanLink', formData.step4.businessPlanLink);
  formDataK.append('intellectualPropertyDescription', formData.step4.intellectualPropertyDescription);
  formDataK.append('competitiveLandscapeDescription', formData.step4.competitiveLandscapeDescription);
  formDataK.append('website', formData.step5.website);
  formDataK.append('socialMediaLinks', formData.step5.socialMediaLinks);
  formDataK.append('videoPitchLink', formData.step5.videoPitchLink);
  formDataK.append('technology', formData.step5.technology);

  console.log(formData);
  axios.post('http://localhost:3000/users', formDataK)
  .then(response => {
    setResp(response.data);
    console.log("res", response);
    if (response.data && typeof response.data === 'object') {
      const transformedData = {
        // companyName: response.data.companyName,
      };

      // console.log('Transformed Data:', transformedData);

      // Update your state or perform any other actions with the transformed data

      toast({
        title: 'Application submitted.',
        description: 'Your application has been submitted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.error('Error: Response data structure is not as expected');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

};

const handleFormChange = (step, field, value, index) => {
  setFormData((prevData) => {
    if ((field === 'teamMemberNames' || field === 'teamMemberRoles' ) ) {
      // let updatedTeamMembers = [...prevData[step].teamMembersList];

      return {
        // ...prevData,
        // [step]: {
        //   ...prevData[step],
        //   teamMembers: updatedTeamMembers,
        // },
      };
    } else {

      return {
        ...prevData,
        [step]: {
          ...prevData[step],
          [field]: value,
        },
      };
      
    }
  });
};






    

  const steps = [
  { title: 'First', description: 'Company Information' },
  { title: 'Second', description: 'Core Business Insights' },
  { title: 'Third', description: 'Development Stage' },
  { title: 'Fourth', description: 'Business Plan' },
  { title: 'Fifth', description: 'Miscellaneous' },
]

   const { activeStep, setActiveStep  } = useSteps({
    initialStep: 0,
    steps: 4,
  });

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={1200}
      w="100%"
      p={6}
      as="form"
      mx="5%"
      my="5%"
      h={'75vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      >
         

    <Stepper index={activeStep} my={4}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

      <Box maxH={"50vh"} overflowY={'scroll'} px={4}>
        {activeStep === 0 ? (
          <Form1
            data={formData.step1}
            onChange={(field, value) =>
              handleFormChange('step1', field, value)
            }

          />
        ) : activeStep === 1 ? (
          <Form2
            data={formData.step2}
            onChange={(field, value) =>
              handleFormChange('step2', field, value)
            }
          />
        ) : activeStep === 2 ? (
          <Form3 
            data={formData.step3}
            onChange={(field, value) =>
              handleFormChange('step3', field, value)
            }
            />
        ) : activeStep === 3 ? (
          <Form4  
            data={formData.step4}
            onChange={(field, value) =>
              handleFormChange('step4', field, value)
            }
          />
        ) : (
          <Form5 
            data={formData.step5}
            onChange={(field, value) =>
              handleFormChange('step5', field, value)
            }
          />
        )}
      </Box>

      <ButtonGroup mt="5%" w="100%" >
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            {/* <Button
              onClick={handleBackStep}
              isDisabled={activeStep === 0}
              colorScheme="blue"
              variant="ghost"
              w="7rem"
              mr="5%"
            >
              Back
            </Button> */}
            <Button
              w="7rem"
              isDisabled={!validateInputs() || activeStep === 4}
              onClick={handleNextStep}
              colorScheme="blue"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {activeStep === 4 ? (
            <Button
              w="7rem"
              colorScheme="blue"
              variant="solid"
              onClick={handleSubmit}
              isDisabled={!validateInputs()}
            >
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>

    </Box>
  );
};

const Form1 = ({ data, onChange }) => {
  const incrementTeamMembers = () => {
    onChange('teamMembers', data.teamMembers + 1);
  };

  const decrementTeamMembers = () => {
    if (data.teamMembers > 1) {
      onChange('teamMembers', data.teamMembers - 1);
    }
  };

  const teamMemberInputs = [];
  for (let i = 0; i < data.teamMembers; i++) {
    teamMemberInputs.push(
        <HStack key={i} spacing={4} my={3}>
          <Input
            placeholder={`Team Member Name`}
            id={`team-member-name-${i}`}
            onChange={(e) =>
              onChange('teamMemberNames', e.target.value, i)
            }
          />
          <Input
            placeholder={`Team Member Role`}
            id={`team-member-role-${i}`}
            onChange={(e) =>
              onChange('teamMemberRoles', e.target.value, i)
            }
          />
        </HStack>
    );
  }
//   const [selectedFile, setSelectedFile] = useState(null);

// const handleFileUpload = (event) => {
//   const fileUploaded = event.target.files[0];
//   setSelectedFile(fileUploaded);
  

//   console.log(fileUploaded);
// }

  return (
    <>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="company-name" fontWeight={'normal'}>
          Company Name
        </FormLabel>
        <Input
          id="company-name"
          placeholder="Company Name"
          onChange={(e) => onChange('companyName', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="company-description" fontWeight={'normal'}>
          Company Description
        </FormLabel>
        <Textarea
          id="company-description"
          placeholder="Company Description"
          onChange={(e) => onChange('companyDescription', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="team-members" fontWeight={'normal'}>
          Number of Team Members
        </FormLabel>
        <HStack spacing={4}>
          <Button onClick={decrementTeamMembers}>-</Button>
          <Input
            w="5rem"
            id="team-members"
            value={data.teamMembers}
            textAlign="center"
            readOnly
          />
          <Button onClick={incrementTeamMembers}>+</Button>
        </HStack>
      </FormControl>
      {teamMemberInputs}
    </>
  );
};



const Form2 = ({ data, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded);
  
    console.log(fileUploaded);
  }
  const upload = () => {
    const formData = new FormData();
    formData.append('businessModel', selectedFile); 
  
    axios
      .post('http://localhost:3000/uploads', formData)
      .then((response) => {
        id:
        console.log(response)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="problem" fontWeight={'normal'}>
          Problem Your Company Solves
        </FormLabel>
        <Textarea
          id="problem"
          placeholder="Problem Your Company Solves"
          onChange={(e) => onChange('problem', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="solution" fontWeight={'normal'}>
          Solution Your Company Provides
        </FormLabel>
        <Textarea
          id="solution"
          placeholder="How Your Company Solves the Problem"
          onChange={(e) => onChange('solution', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="target-market" fontWeight={'normal'}>
          Target Market
        </FormLabel>
        <Input
          id="target-market"
          placeholder="Your Target Market"
          onChange={(e) => onChange('targetMarket', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="business-model" fontWeight={'normal'}>
          Business Model
        </FormLabel>
        {/* PDF UPLOAD File */}
        <input
  type="file"
  id="business-model"
  name="businessModel"
  accept=".pdf"
  onChange={(e) => {
    // handleFileUpload(e);
    onChange('businessModel', e.target.files[0]);
  }}  />
        
      </FormControl>
    </>
  );
};

const Form3 = ({ data, onChange }) => {
  return (
    <>
    <FormControl isRequired>
        <FormLabel htmlFor="stage-of-development" fontWeight={'normal'}>
          Stage of Development
        </FormLabel>
        <Input
          id="stage-of-development"
          placeholder="Stage of Development"
          onChange={(e) => onChange('stageOfDevelopment', e.target.value)}
        />
      </FormControl>

      </>
  );
};

const Form4 = ({ data, onChange }) => {
  return (
    <>
      <FormControl mt="2%">
        <FormLabel htmlFor="pitch-deck" fontWeight={'normal'}>
          Pitch Deck
        </FormLabel>
        <Input
          id="pitch-deck"
          placeholder="Pitch Deck"
          onChange={(e) => onChange('pitchDeckLink', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="business-plan" fontWeight={'normal'}>
          Business Plan
        </FormLabel>
        <Input
          id="business-plan"
          placeholder="Business Plan"
          onChange={(e) => onChange('businessPlanLink', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="intellectual-property" fontWeight={'normal'}>
          Intellectual Property
        </FormLabel>
        <Textarea
          id="intellectual-property"
          placeholder="Description of Intellectual Property"
          onChange={(e) => onChange('intellectualPropertyDescription', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="competitive-landscape" fontWeight={'normal'}>
          Competitive Landscape
        </FormLabel>
        <Textarea
          id="competitive-landscape"
          placeholder="How Your Company Differentiates Itself?"
          onChange={(e) => onChange('competitiveLandscapeDescription', e.target.value)}
        />
      </FormControl>

    </>
  );
};

const Form5 = ({ data, onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

const handleFileUpload = (event) => {
  const fileUploaded = event.target.files[0];
  setSelectedFile(fileUploaded);
  
  console.log(fileUploaded);
}
const upload = () => {
  setIsClicked(true);
  let formData = new FormData();
  formData.append('technology', selectedFile); 
  // formData = {...formData, technology: selectedFile}
  console.log("on up", formData);
  
  axios
    .post('http://localhost:3000/uploads', formData)
    .then((response) => {
      
      if (response.data && typeof response.data === 'object') {
        const transformedData = {
          // companyName: response.data.companyName,
        };


        
      } else {
        console.error('Error: Response data structure is not as expected');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
  return (
    <>
      <FormControl mt="2%">
        <FormLabel htmlFor="website" fontWeight={'normal'}>
          Website
        </FormLabel>
        <Input
          id="website"
          placeholder="Website URL"
          onChange={(e) => onChange('website', e.target.value)}
        />
      </FormControl>
       <FormControl>
        <FormLabel htmlFor="social-media" fontWeight={'normal'}>
          Social Media Links
        </FormLabel>
        <Textarea
          id="social-media"
          placeholder="Social Media Links (if any)"
          onChange={(e) => onChange('socialMediaLinks', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="video-pitch" fontWeight={'normal'}>
          Video Pitch
        </FormLabel>
        <Input
          id="video-pitch"
          placeholder="Link to Video Pitch"
          onChange={(e) => onChange('videoPitchLink', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
      <FormLabel htmlFor="technology" fontWeight={'normal'}>
        Miscellaneous Documents (if any)
        
      </FormLabel>
      <input
        type="file"
        id="technology"
        name="technology"
        accept=".pdf" 
        onChange={(e) => {
          onChange('technology', e.target.files[0]);
        }}

        
      />

      </FormControl>
      


    </>
  );
};

export default ApplicationForm;

