import { Task, Activity, UserProfile } from '../types';

export const initialUser: UserProfile = {
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@taskflow.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEN2pvJ1xTarICZE3ox_KYKA6mdLwHSOMBzExwXLGpokFxdM8yaqElkb1zOa7uCMsNMVC05tO6GKvzXJEwCuPYVa17q9UsL1ipNepbxfhwj7lv70nm2WAJwwTYMd7cQPOhe6OHwkkQaGtYjVwNks_eIFhPzpPdGPq8eYoMyEfOdA2Kaf6c3w_EdLLV3O8iz4cAD4cewTrCQAXvvl1TVNt7jejV_XcSiY2Q3IqzQbp1Arq48K9PZKGoJGgTABo-HNogXbSVf7KT2V8',
  role: 'Lead Project Manager',
  company: 'Enterprise Team'
};

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement User Authentication Flow',
    description: 'Complete the integration of OAuth2 providers and implement the multi-factor authentication screens. The flow should handle social logins (Google, GitHub) and traditional email/password setups. Ensure the JWT handling is secure and follows the latest security best practices for session management.',
    status: 'InProgress',
    priority: 'High',
    category: 'Website Redesign',
    dueDate: '2026-10-24',
    assignees: [
      {
        name: 'Sarah Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS6ebLXyuWD8LHSf-uwuJmt09vvOJSVmrGjKyTUAt4KV7QdGQRgKXqZjmktMHVJfPmmNSW88CIbcggxVLWP1fQucf5GSPapTv04gGW7FkC2elgjnO1AHwXAq52xytLR-DDt2VosW2mOh-qJFO4Lm1Qxb5w-rX4VW_eQPSq4YDZe_DZhHQFncwC3a5wGIve4HsJgfUB2q8QYwgVzSIC9w9f4kTcODMVH7iTCall9YV4Zz5ASjJSEcOBu316P2E-DY569Tm0nrDBZSs',
        role: 'Lead Developer'
      },
      {
        name: 'John Doe',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgZ4GTHDKqoVYj9bMxxEPmNlGL2vdMJvlKv2JF0ki2EO5zeYxQKCKgZspT1BLmH6t7qWwNHU1NVSYvQ_K2v1wlg0hQHIFGqsvx3dN_Hf9xBHujZ4cLSB_2qhCPrMzO__9DpaMKfMVmCRzsC_xJb7NbQRWdojlcKAGXDpHvlRy2AVUzPHB5CrDPDALJ05Dd7uxpgxLnCpAQC9niFzgJnNu5I0erLq6DuQZY48-BlUbHRWrakgQNS1ROUBabkwxgxztzVuCzENeCpf0',
        role: 'Backend Dev'
      }
    ],
    subtasks: [
      { id: 'sub-1', title: 'Configure Google Cloud Console OAuth credentials', completed: true },
      { id: 'sub-2', title: 'Build the reusable Auth Layout component', completed: true },
      { id: 'sub-3', title: 'Integrate GitHub API for social provider login', completed: true },
      { id: 'sub-4', title: 'Implement 2FA backup code generation flow', completed: false },
      { id: 'sub-5', title: 'Unit tests for middleware session verification', completed: false }
    ],
    comments: [
      {
        id: 'comment-1',
        user: {
          name: 'John Doe',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgZ4GTHDKqoVYj9bMxxEPmNlGL2vdMJvlKv2JF0ki2EO5zeYxQKCKgZspT1BLmH6t7qWwNHU1NVSYvQ_K2v1wlg0hQHIFGqsvx3dN_Hf9xBHujZ4cLSB_2qhCPrMzO__9DpaMKfMVmCRzsC_xJb7NbQRWdojlcKAGXDpHvlRy2AVUzPHB5CrDPDALJ05Dd7uxpgxLnCpAQC9niFzgJnNu5I0erLq6DuQZY48-BlUbHRWrakgQNS1ROUBabkwxgxztzVuCzENeCpf0'
        },
        text: "I've just uploaded the updated API specs for the OAuth flow. Please check the 'Attachments' section above for the PDF.",
        timestamp: 'Oct 12, 10:45 AM'
      },
      {
        id: 'comment-2',
        user: {
          name: 'Sarah Chen',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS6ebLXyuWD8LHSf-uwuJmt09vvOJSVmrGjKyTUAt4KV7QdGQRgKXqZjmktMHVJfPmmNSW88CIbcggxVLWP1fQucf5GSPapTv04gGW7FkC2elgjnO1AHwXAq52xytLR-DDt2VosW2mOh-qJFO4Lm1Qxb5w-rX4VW_eQPSq4YDZe_DZhHQFncwC3a5wGIve4HsJgfUB2q8QYwgVzSIC9w9f4kTcODMVH7iTCall9YV4Zz5ASjJSEcOBu316P2E-DY569Tm0nrDBZSs'
        },
        text: "Looks good, John. I'll start implementing the frontend components this afternoon.",
        timestamp: 'Oct 12, 11:20 AM'
      }
    ],
    attachments: [
      {
        id: 'attach-1',
        name: 'auth_mockup_v2.png',
        type: 'image',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBOAvit27caEHMrCL_fjgCHuH4z3q0bAy2DJ8Cgphi0hbxWvN5Nc7aGz5QBg-g6r_8b0gNigWTJ-FHCX4r6R68ucq3fTctKp5WPBu4BCg0B9EVoEnZ6PYpyV5y11obR3_s6GRpImA-Kvcej3S_NYkoiZWc9OrsE0Vgl-krmXaxwHhRJ7h8FB3Z0kdfSMGwlHUs_JueMtmpF538lX5eJf4tJ-bDlUbpJOO3P-pUXkemXDRx758_tComEzMJjWwcBEHamWyc3cphhH4'
      },
      {
        id: 'attach-2',
        name: 'API_Specs.pdf',
        type: 'pdf'
      },
      {
        id: 'attach-3',
        name: 'User_Stories.docx',
        type: 'doc'
      }
    ],
    tags: ['Frontend', 'Security', 'v2.0']
  },
  {
    id: 'task-2',
    title: 'Website Q3 Audit',
    description: 'Perform a comprehensive security, accessibility, and SEO audit on the primary web app prior to the Q3 lock-down release.',
    status: 'Todo',
    priority: 'High',
    category: 'Marketing',
    dueDate: '2026-06-15',
    assignees: [
      {
        name: 'Sarah Jenkins',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb1BE8PdNlQDwq4eBioALK0bfvKltWE8DyRZg7RiOCkjI7Ql06MvKgW1XjiRUAu4i-V83dNaM0oaRWpF_4IOBJmM3WZorCvXUgPBmX4SiElAtryYHFyWBCvgnw7v4Hjoa1M8_CqU1DnvXIpL3Oyfat8qkQLWNvOuyEqXgoKh3_A_m5Q5LArJvcvCuaA5YHiAzV1POh6wi7tRj5FV2M_jflZj4IeV7LVpvjb9p-eYVTb1yOQXlkmJwKGmIIIIkfTA27k0dtjZQm74E'
      },
      {
        name: 'Marcus Kane',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpGcydcU1hjODa4VbpspWxvlC1CDIgf0-5CbRVCa_EZGlnnGQ0aPfcwd23iwVqVd5fTsiSlysrN5FIZjkW-nXjbko_AF7_2Lx8pAjVgvcE03o1KLO5obhj0M38dRR-rqwkSb3qlU5pXhJwhE0ljsUHzm30TMkc4FvJ4iA0dupNIjd6Y_iGwVbL2sJqrAYvpRAm1kUVUm7gGpNK98ak2NbD52SM84JtATgk6e5wjF5uXeS6Ld2Z9hFPCU6KfZ7lnUwcPLvvF5RGDMc'
      }
    ],
    subtasks: [
      { id: 'sub-2-1', title: 'SEO audit checking', completed: false },
      { id: 'sub-2-2', title: 'Lighthouse accessibility checklist', completed: true }
    ],
    comments: [],
    attachments: [],
    tags: ['Marketing', 'Audit']
  },
  {
    id: 'task-3',
    title: 'Product Roadmap Sync',
    description: 'Ensure all cross-functional engineering leads are aligned on the upcoming Q4 features rollout schedule.',
    status: 'Todo',
    priority: 'Medium',
    category: 'Product',
    dueDate: '2026-06-01',
    assignees: [
      {
        name: 'Elena Lopez',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhzgTypwAAU816ki3FhzfYxPiRXN7Ak-QrWE9_mFUz-CcSzHswytCjJnfq9_6lpsV7i69aoLbHydDYUblTxV4xrK0vTeotP6_E-BcKe5YU-InG4wOUCmX1T6HTe73tfIOAJZx8ldpX6aHxnSoYDAiLILYOdrUeIqfj97SwVknVv-VHsFiyz-2MP4Ccq3MpIK9EVTTBE9X6WJCVUnmKoYgEo9R_-Z5Ve3l9Uup5vbvy2eFl4EKlVGCFEOwr2FEOooHopCaFnAthPOY'
      }
    ],
    subtasks: [],
    comments: [],
    attachments: [],
    tags: ['Product', 'Sync']
  },
  {
    id: 'task-4',
    title: 'Client Feedback Review',
    description: 'Analyze visual design critiques and product feature notes submitted by our pilot enterprise customers.',
    status: 'Todo',
    priority: 'Low',
    category: 'Design',
    dueDate: '2026-10-24',
    assignees: [
      {
        name: 'James Doe',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvq9-TA9i5hiYifalpw4L1sBc5Vy-bzKATXW6RlhhC_1wdP7wlMTXlRxaCrGnEebw7svA34fZSBr4ZDgn4mwQUnYlY1PwUY0fVw-lhyPPOKwfs64zjelGzRSma681K-ErDc-_BkCpoAw9ava8SbaWJL60JP6g0lT47aWWTTWdZ-J-p_HYZDCfgu5Wm8yCFtQuC2SAZhkzwaSHplX7Bop5emRE6d-S6Z8jpxvDRWuW6nCHyaii1oEhhWgP1usB3ZhdwE4hF69HMsog'
      }
    ],
    subtasks: [],
    comments: [],
    attachments: [],
    tags: ['Design', 'UX']
  },
  {
    id: 'task-5',
    title: 'Bento Grid Dashboard Layout',
    description: 'Redesign the main dashboard to use a modern bento grid pattern with responsive widgets and fluid metrics charts.',
    status: 'InProgress',
    priority: 'High',
    category: 'Design',
    dueDate: '2026-06-20',
    assignees: [
      {
        name: 'Marcus Kane',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJAkAMyvh4wiRF3OzG6tTg340ZBwwjJZOC3gT01d8lKSvIPpO05AcNK3MJgBwFLF_LAcnif8jGVheVIFqYpPpxUP8LKeSuqgEKoKp-3HXGGvRcz13ppRpO4rtL6j67M6iKsb9JiE6Y1JRCoB5ofu4YiGyATEfKH0jlzOaRSeQooSSbQ4nODrkd0SywD3_7q_m68FTp-3ewBTc0zNCdELDiNDl5vFcGIN8fed_W9PJ9GqBGIG3vRoBgBuXiqho1xH0_Y-0Fh7WW32g'
      }
    ],
    subtasks: Array.from({ length: 18 }, (_, i) => ({
      id: `sub-5-${i}`,
      title: `Subtask item ${i + 1}`,
      completed: i < 12
    })),
    comments: [],
    attachments: [],
    tags: ['Feature', 'UI/UX']
  },
  {
    id: 'task-6',
    title: 'Fix sidebar collapse flicker',
    description: 'Resolve CSS transition glitches matching frame rates on rendering collapsed sidebar options.',
    status: 'Todo',
    priority: 'Medium',
    category: 'Frontend',
    dueDate: '2026-06-12',
    assignees: [
      {
        name: 'Sarah Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSx-PvrFNTZwqlxOvJVahIwJEqaMWO9WHiH3H1dshTqjJdkaX5ROq6bblakB2iiY5BDrzy_0kU-Wu_vU3eed-skzLfg3b-CpJBopgrZI9-voUwYqeBLHx5Ci5cu-mdGdlMhCv-xpy9lMwLbtkVnODH9F4WEJcfjHnAiT3D_rOiDP5k2f2RMQC-h3jA6-_EXJh4nltQjHwRPkobQ3H6ClFmOCsFTG7vTAQ_agWGNPIW2lWNkgAEaefdXLBXYLouGxScQxvO90S4do'
      }
    ],
    subtasks: [],
    comments: [],
    attachments: [],
    tags: ['Bug', 'CSS']
  },
  {
    id: 'task-7',
    title: 'Update brand style guidelines',
    description: 'Incorporate new soft elements, typography rules for Space Grotesk/Inter, and modern corporate spacing metrics.',
    status: 'InReview',
    priority: 'Low',
    category: 'Design',
    dueDate: '2026-07-01',
    assignees: [
      {
        name: 'Sarah Jenkins',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA0dBtl13aJONMc1TZriKLSvs4y8XJX1f2CdXzBnDMTcUXRmSTlSuF_vw5Q1b3lXiIKPa_HMV7sxHCZ5g_oFTLEmZXrOdhdsMk-goYJKh5GDz4K_ZpXGgh9vcqBJnThWwkWSuAdf4SWdL81pdNYb0nLdpXKRIGH47dZK5rPwOCFwvNQuetwftRZEVXGTtpeuyjsoMpzIkeWI8aZ1_XUYUhnmCIUE9Xq1HJKqaVKMJ1tUKlj-mTdQCZpJw6bIT0kPUHxKHv2AkZxOk'
      }
    ],
    subtasks: [],
    comments: [],
    attachments: [],
    tags: ['Design', 'Brand']
  },
  {
    id: 'task-8',
    title: 'v1.2.0 API Deployment',
    description: 'Ship the Node.js database cluster optimization updates to production endpoints.',
    status: 'Done',
    priority: 'High',
    category: 'Release',
    dueDate: '2026-05-12',
    assignees: [
      {
        name: 'John Doe',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJkf4yj5OPF6LrerpqRGg7p_wGwk5AGZKCgCpQSm1qG8_uqy8IbU1rErBNIWFTscNKGG_pCt8jVIfFKnxeepaXjPzIib-e5QEf4pSXXDXS6KbtBaLDbWwqLlO1xZyGSNNzrStziFTEoiZC_z4mBHM_AO6s46YLjDBICiWHHu6bJUB-6s3n5PO4QxFjYauH2-McVFakrnkg2dWc8diOXyFF9VQuqe2XFeDsFTakcorlQvNg4405YawM9K92O7I7PmtS5LBVFSQndqU'
      }
    ],
    subtasks: [],
    comments: [],
    attachments: [],
    tags: ['Release', 'Post-Deployment']
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'add',
    user: {
      name: 'Alex Rivera',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcalI0SwsaqqaECigKH8MLNto-GjuCM_Lt1F-GszGQKHJdk17_V3vMjMSCXkO7kmXiI3PW9Fd5kboyiTot2GU6A0Su8gEz_Lxb42QeGC118bH35RWzRYip02Ws8c5-nD37unocQ44tkGzWIYlucS_WhPGwzMVljgUpstb482P56NiSaEedmEn5pkP3L78CnuHYGdaOUhkMxfLcpyTM7_POLqHp3aL3Wwt9-V1ATQGVjStwYd6J8yeAT4gyHedOTmTJWNcnVMTBMNQ'
    },
    taskTitle: 'Update API Docs',
    timestamp: '24 minutes ago'
  },
  {
    id: 'act-2',
    type: 'check',
    user: {
      name: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEN2pvJ1xTarICZE3ox_KYKA6mdLwHSOMBzExwXLGpokFxdM8yaqElkb1zOa7uCMsNMVC05tO6GKvzXJEwCuPYVa17q9UsL1ipNepbxfhwj7lv70nm2WAJwwTYMd7cQPOhe6OHwkkQaGtYjVwNks_eIFhPzpPdGPq8eYoMyEfOdA2Kaf6c3w_EdLLV3O8iz4cAD4cewTrCQAXvvl1TVNt7jejV_XcSiY2Q3IqzQbp1Arq48K9PZKGoJGgTABo-HNogXbSVf7KT2V8'
    },
    taskTitle: 'Monthly Finance Report',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-3',
    type: 'comment',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA0dBtl13aJONMc1TZriKLSvs4y8XJX1f2CdXzBnDMTcUXRmSTlSuF_vw5Q1b3lXiIKPa_HMV7sxHCZ5g_oFTLEmZXrOdhdsMk-goYJKh5GDz4K_ZpXGgh9vcqBJnThWwkWSuAdf4SWdL81pdNYb0nLdpXKRIGH47dZK5rPwOCFwvNQuetwftRZEVXGTtpeuyjsoMpzIkeWI8aZ1_XUYUhnmCIUE9Xq1HJKqaVKMJ1tUKlj-mTdQCZpJw6bIT0kPUHxKHv2AkZxOk'
    },
    taskTitle: 'Login Flow Redesign',
    detail: "Let's make sure the mobile state is fully responsive before the demo next week.",
    timestamp: '4 hours ago'
  },
  {
    id: 'act-4',
    type: 'edit',
    user: {
      name: 'Mike Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC72u1nA0lfZqZwBc5hbhzMJSZ-UhkL18xhNl3Z1jrOO5uvQFzjU4UTgx_2dwr834uv522YhZKFN-oIaCe-u1ZLTWdXRENZ7sizzP_b8QREa1Uq0kP1aslpIxQXYdfDcpeyJt7opIfCVJSG-RHH_HWk1ZPSK5gFIMMGBnAhRYF9XfjCrEjuLJayUjn2D5YIBMGY3Q61kt_Th47gkCoir5SidUMr9Tca9xYJh2B5ckueITL-XJ5J56H2WVbWx3LNVaD4jENcmk-skSA'
    },
    taskTitle: 'Database Migration to Review',
    timestamp: 'Yesterday'
  }
];
