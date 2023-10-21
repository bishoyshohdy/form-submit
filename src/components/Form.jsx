import React, { useState, useEffect  } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
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

const handleFileUpload = (event) => {
  const fileUploaded = event.target.files[0];
  console.log(fileUploaded);
  
}

const ApplicationForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);

  const [formData, setFormData] = useState({
    step1: {
      companyName: '',
      companyDescription: '',
      teamMembers: 1,
      teamMemberNames: [''],
      teamMemberRoles: [''],
    },
    step2: {
      problem: '',
      solution: '',
      targetMarket: '',
      businessModel: '',
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
    },

  });

  const [formValid, setFormValid] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

const handleNextStep = () => {
  if (formValid[`step${step}`]) {
    setStep(step + 1);
    setProgress(progress + 20);
    setActiveStep(step+1);

  }
};


const loadPreviousStepData = () => {
  if (step === 2) {
    const { companyName, companyDescription, teamMembers } = formData.step1;
    setFormData({
      ...formData,
      step1: {
        companyName,
        companyDescription,
        teamMembers,
      },
    });
  } else if (step === 3) {
    const { problem, solution, targetMarket, businessModel } = formData.step2;
    setFormData({
      ...formData,
      step2: {
        problem,
        solution,
        targetMarket,
        businessModel,
      },
    });
  } else if (step === 4) {
    const { stageOfDevelopment } = formData.step3;
    setFormData({
      ...formData,
      step3: {
        stageOfDevelopment,
      },
    });
  } else if (step === 5) {
    const {
      pitchDeckLink,
      businessPlanLink,
      intellectualPropertyDescription,
      competitiveLandscapeDescription,
    } = formData.step4;
    setFormData({
      ...formData,
      step4: {
        pitchDeckLink,
        businessPlanLink,
        intellectualPropertyDescription,
        competitiveLandscapeDescription,
      },
    });
  } else if (step === 6) {
    const { website, socialMediaLinks, videoPitchLink } = formData.step5;
    setFormData({
      ...formData,
      step5: {
        website,
        socialMediaLinks,
        videoPitchLink,
      },
    });
  }

};


const handleBackStep = () => {
  if (step > 1) {
    loadPreviousStepData(); 
    setStep(step - 1);
    setProgress(progress - 20);
    setActiveStep(step -1);
  }
};




  const handleSubmit = () => {
    if (validateStep(step)) {
      toast({
        title: 'Application submitted.',
        description: 'Your application has been submitted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const validateStep = (step) => {
    const currentStepData = formData[`step${step}`];
    const isStepValid = Object.values(currentStepData).every(
      (value) => value !== ''
    );
    setFormValid({ ...formValid, [`step${step}`]: isStepValid });
  };

  const handleFormChange = (step, field, value) => {
    setFormData({
      ...formData,
      [step]: {
        ...formData[step],
        [field]: value,
      },
    });
      };

  const validateCurrentStep = () => {
  const currentStepData = formData[`step${step}`];
  const isStepValid = Object.values(currentStepData).every(
    (value) => value !== '' || value !== 0
  );
  setFormValid({ ...formValid, [`step${step}`]: isStepValid });

};

    
  useEffect(() => {
    validateCurrentStep();
  }, [formData, step]);

  const steps = [
  { title: 'First', description: 'Company Information' },
  { title: 'Second', description: 'Core Business Insights' },
  { title: 'Third', description: 'Development Stage' },
  { title: 'Fourth', description: 'Business Plan' },
  { title: 'Fifth', description: 'Miscellaneous' },
]

   const { activeStep, setActiveStep  } = useSteps({
    index: 1,
    count: steps.length,
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

      <Box maxH={'60vh'} overflowY={'scroll'} px={4}>
        {step === 1 ? (
          <Form1
            data={formData.step1}
            onChange={(field, value) =>
              handleFormChange('step1', field, value)
            }

          />
        ) : step === 2 ? (
          <Form2
            data={formData.step2}
            onChange={(field, value) =>
              handleFormChange('step2', field, value)
            }
          />
        ) : step === 3 ? (
          <Form3 
            data={formData.step3}
            onChange={(field, value) =>
              handleFormChange('step3', field, value)
            }
            />
        ) : step === 4 ? (
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

      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              onClick={handleBackStep}
              isDisabled={step === 1}
              colorScheme="blue"
              variant="solid"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>
            <Button
              w="7rem"
              isDisabled={step === 5 || !formValid[`step${step}`]}
              onClick={handleNextStep}
              colorScheme="blue"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 5 ? (
            <Button
              w="7rem"
              colorScheme="red"
              variant="solid"
              onClick={handleSubmit}
              isDisabled={!formValid[`step${step}`]}
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
          />
          <Input
            placeholder={`Team Member Role`}
            id={`team-member-role-${i}`}
          />
        </HStack>
    );
  }

  return (
    <>
      <FormControl isRequired>
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
      <FormControl mt="2%">
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
  return (
    <>
      <FormControl mt="2%">
        <FormLabel htmlFor="problem" fontWeight={'normal'}>
          Problem Your Company Solves
        </FormLabel>
        <Textarea
          id="problem"
          placeholder="Problem Your Company Solves"
          onChange={(e) => onChange('problem', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="solution" fontWeight={'normal'}>
          Solution Your Company Provides
        </FormLabel>
        <Textarea
          id="solution"
          placeholder="How Your Company Solves the Problem"
          onChange={(e) => onChange('solution', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="target-market" fontWeight={'normal'}>
          Target Market
        </FormLabel>
        <Input
          id="target-market"
          placeholder="Your Target Market"
          onChange={(e) => onChange('targetMarket', e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="business-model" fontWeight={'normal'}>
          Business Model
        </FormLabel>
        {/* PDF UPLOAD File */}
        <input
        type="file"
        id="technology"
        name="technology"
        accept=".pdf" 
        onChange={handleFileUpload} 
      />

      </FormControl>
    </>
  );
};

const Form3 = ({ data, onChange }) => {
  return (
    <>
    <FormControl>
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
        onChange={handleFileUpload} 
      />
      </FormControl>

    </>
  );
};

export default ApplicationForm;

