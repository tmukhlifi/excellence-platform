#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "إكمال مسار وحدة التدقيق الداخلي ISO من برنامج التدقيق السنوي إلى الإغلاق (9 مراحل) مع تحسين تجربة المستخدم وإضافة أزرار انتقال وربطها بلوحة القيادة والشواهد وفرص ومشاريع التحسين."

frontend:
  - task: "ISO Internal Audit 9-stage workflow"
    implemented: true
    working: true
    file: "/app/frontend/src/excellence/pages/AuditPages.tsx, /app/frontend/src/excellence/components/AuditWorkflowNav.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Built 9-stage audit module: program → plans → checklists → execution → results → non-conformities → root-cause → corrective-actions → closure. Each page shows AuditWorkflowNav (visual 9-step progress) + AuditCrossLinks (dashboard/evidences/gaps/projects) + AuditStageActions (Previous/Next stage buttons). Sidebar has collapsible 'التدقيق الداخلي ISO' group listing 9 numbered sub-items. Dashboard now has 'ملخص التدقيق الداخلي ISO' card linking to all 9 stages with KPIs."
      - working: true
        agent: "testing"
        comment: "All 12 test scenarios PASSED: navigation between all 9 stages works, Previous/Next buttons functional, status badges visible, RTL/Arabic working, cross-module links functional, RCA tabs (5-Whys/Ishikawa/Conclusion) work, 'تحويل إلى مشروع تحسين' buttons on NC page work. No critical issues."

metadata:
  created_by: "main_agent"
  version: "1.1"
  test_sequence: 1

test_plan:
  current_focus:
    - "ISO Internal Audit 9-stage workflow"
  stuck_tasks: []
  test_all: false
  test_priority: "completed"

agent_communication:
  - agent: "main"
    message: "تم إنجاز وحدة التدقيق الداخلي ISO كاملة بـ 9 مراحل متصلة. أُضيف ملف AuditPages.tsx (9 صفحات) + AuditWorkflowNav.tsx (مكون التنقل بين المراحل). أُضيفت 10 routes إلى App.tsx، وقائمة جانبية قابلة للتوسيع، وملخص في لوحة القيادة. تم اختبار جميع المراحل بنجاح."
