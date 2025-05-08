# Development Cycle and Types of AI Deployment: Study Notes
2025-01-13  

AI deployment exists on a spectrum, ranging from not deployed to fully deployed. Below is an overview of the development cycle, key considerations, and common deployment strategies.  

## AI Development Cycle  

1. Scoping  
- Define the project scope and key success metrics (e.g., accuracy, query performance).  

2. Data  
- Define and collect relevant data.  
- Establish a baseline, label data, and organize datasets.  

3. Model  
- Select and train a model.  
- Perform error analysis and refine the model.  

4. Deployment  
- Move the model to production.  
- Continuously monitor and maintain performance post-deployment.  

## Key Deployment Questions  
Before deploying AI, consider the following:  
- Realtime or Batch? (Does the system require instant responses or scheduled processing?)  
- Cloud or Edge/Browser? (Where will the model run—on cloud servers or locally on devices?)  
- Computational Resources (CPU/GPU/Memory requirements)  
- Metrics & Logging (What performance indicators will be tracked?)  
- Security & Privacy (How will data protection be ensured?)  

## Performance Metrics  

**Software Metrics**  
- Memory usage  
- Computational load  
- Latency & throughput  
- Server load  

**Input Metrics**  
- Average input length  
- Data volume  
- Missing values  

**Output Metrics**  
- Frequency of null returns  
- User re-searches (indicates dissatisfaction)  

**Common Deployment Cases**  
1. New Product/Capability – Introducing AI where none existed before.  
2. Automating/Assisting Manual Tasks – Enhancing human workflows with AI.  
3. Replacing a Previous ML System – Upgrading or switching out an existing model.  

## Types of AI Deployment  

1. **Shadow Mode**  
- Both human operators and AI run in parallel.  
- AI predictions are not used for decision-making (only for comparison).  

2. **Canary Deployment**  
- Roll out to a small subset (e.g., 5%) of users first.  
- Monitor performance before scaling up.  

3. **Blue-Green Deployment**  
- Traffic is split between:  
  - Blue (Old Version)  
  - Green (New Version)  
- Enables instant rollback if issues arise.  

## Degrees of Automation
A gradual transition from human control to full automation:  
1. Human Only 
2. Shadow Mode
3. AI Assistance
4. Partial Automation
5. Full Automation  

(*AI Assistance* and *Partial Automation* are considered human-in-the-loop deployments.)  

## Questions to Consider Before Deployment  
- What are the failure modes, and how will they be handled?  
- How often will the model need retraining?  
- What are the ethical implications of automation?  

### Citation  
[Coursera – Introduction to Machine Learning in Production](https://www.coursera.org/learn/introduction-to-machine-learning-in-production)  