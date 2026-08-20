export const practicalsPart2 = [
  {
    id: 13,
    title: 'Authentication & Login Form with Password Masking',
    aim: 'To develop a Secure Login Form with PasswordChar masking, username validation, show/hide password checkbox, and an attempt lockout mechanism (3 attempts max).',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'PasswordChar', 'Authentication', 'Security', 'Lockout'],
    algorithm: [
      'Create Windows Form with TextBoxes `txtUser` and `txtPass` (PasswordChar = \'•\' or \'*\').',
      'Add CheckBox `chkShowPassword` to toggle `txtPass.UseSystemPasswordChar`.',
      'Declare integer `attempts = 3;`.',
      'In `btnLogin_Click`: verify if txtUser.Text == \"admin\" and txtPass.Text == \"bca123\".',
      'If correct, display \"Login Successful! Welcome Administrator\" and open Dashboard or reset.',
      'If incorrect, decrement `attempts`. If attempts reach 0, disable controls and show Lockout error.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormLogin : Form
{
    private int remainingAttempts = 3;

    public FormLogin()
    {
        InitializeComponent();
        txtPass.PasswordChar = '•';
    }

    private void btnLogin_Click(object sender, EventArgs e)
    {
        string username = txtUser.Text.Trim();
        string password = txtPass.Text;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            MessageBox.Show("Please enter both Username and Password.", "Missing Fields", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        // Hardcoded credential check for lab demo
        if (username == "admin" && password == "admin@123")
        {
            MessageBox.Show($"Welcome, {username}! Access Granted.", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
            this.BackColor = Color.LightGreen;
            remainingAttempts = 3;
            lblStatus.Text = "Status: Authenticated";
        }
        else
        {
            remainingAttempts--;
            lblAttempts.Text = $"Attempts Remaining: {remainingAttempts}";

            if (remainingAttempts > 0)
            {
                MessageBox.Show($"Invalid credentials! {remainingAttempts} attempt(s) remaining.", "Access Denied", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtPass.Clear();
                txtPass.Focus();
            }
            else
            {
                MessageBox.Show("Maximum attempts exceeded! Your account has been temporarily locked.", "Account Locked", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                btnLogin.Enabled = false;
                txtUser.Enabled = false;
                txtPass.Enabled = false;
                lblStatus.Text = "Status: Account Locked";
            }
        }
    }

    private void chkShowPass_CheckedChanged(object sender, EventArgs e)
    {
        txtPass.PasswordChar = chkShowPass.Checked ? '\\0' : '•';
    }
}`,
    codeExplanation: 'Handles password security properties in WinForms. Uses PasswordChar with null terminator \\0 to reveal characters when the checkbox is toggled.',
    traceSteps: [
      { line: 17, explanation: 'Read credentials: User="admin", Password="wrong_pass".', variables: { username: '"admin"', remainingAttempts: 3 }, callStack: 'btnLogin_Click' },
      { line: 31, explanation: 'Credentials mismatch! Decrement remainingAttempts = 2.', variables: { remainingAttempts: 2 }, outputLog: 'Invalid credentials! 2 attempt(s) remaining.' },
      { line: 49, explanation: 'chkShowPass toggled -> set txtPass.PasswordChar = \\0 to show cleartext.', variables: { 'txtPass.PasswordChar': '\\0' }, outputLog: 'Password visibility toggled.' }
    ],
    simulatedOutput: [
      'Form Loaded: Admin Authentication Portal',
      'Attempt 1: user="admin", pass="wrong" -> Failed. Remaining: 2',
      'Attempt 2: user="admin", pass="admin@123" -> SUCCESS: Access Granted!',
      'Dashboard unlocked.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Design', description: 'Place 2 Labels, 2 TextBoxes, 1 CheckBox ("Show Password"), 1 Button ("Login"), and status Labels.' },
      { stepNumber: 2, title: 'Set Password Properties', description: 'In Properties window for txtPass, set UseSystemPasswordChar = True or PasswordChar = *.' },
      { stepNumber: 3, title: 'Code Click Event', description: 'Double click btnLogin and implement attempt counting logic.' }
    ],
    vivaQuestions: [
      { question: 'How do you hide characters in a WinForms TextBox for passwords?', shortAnswer: 'By setting txtPassword.PasswordChar = \'*\' or txtPassword.UseSystemPasswordChar = true.', detailedAnswer: 'UseSystemPasswordChar matches the operating system standard bullet symbol, while PasswordChar allows setting a custom mask character like * or #.' }
    ],
    emulatorType: 'login-form'
  },
  {
    id: 14,
    title: 'GroupBox with Dynamic Form Background Color Selector',
    aim: 'To demonstrate GroupBox container control containing RadioButtons to dynamically change the form and label background colors at runtime.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['WinForms', 'GroupBox', 'RadioButton', 'Color', 'Containers'],
    algorithm: [
      'Place a GroupBox titled \"Choose Background Theme\" on the Form.',
      'Place 4 RadioButtons inside the GroupBox: Crimson Red, Ocean Blue, Forest Green, Light Slate.',
      'In each RadioButton\'s `CheckedChanged` event handler, check if `rad.Checked == true`.',
      'Assign corresponding `Color` structure to `this.BackColor` or specific target panel.',
      'Update descriptive label displaying Hex Code and RGB values.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormGroupColor : Form
{
    public FormGroupColor()
    {
        InitializeComponent();
    }

    private void radTheme_CheckedChanged(object sender, EventArgs e)
    {
        RadioButton rad = sender as RadioButton;
        if (rad != null && rad.Checked)
        {
            switch (rad.Text)
            {
                case "Ocean Blue":
                    this.BackColor = Color.FromArgb(220, 235, 252);
                    lblCurrentColor.Text = "Current Color: Ocean Blue (#DCEBFC)";
                    break;
                case "Forest Green":
                    this.BackColor = Color.FromArgb(220, 245, 225);
                    lblCurrentColor.Text = "Current Color: Forest Green (#DCF5E1)";
                    break;
                case "Crimson Sunset":
                    this.BackColor = Color.FromArgb(254, 226, 226);
                    lblCurrentColor.Text = "Current Color: Crimson Sunset (#FEE2E2)";
                    break;
                case "Dark Studio":
                    this.BackColor = Color.FromArgb(30, 41, 59);
                    this.ForeColor = Color.White;
                    lblCurrentColor.Text = "Current Color: Dark Studio (#1E293B)";
                    break;
            }
        }
    }
}`,
    codeExplanation: 'Demonstrates GroupBox as an exclusive grouping container for RadioButtons, using Color.FromArgb for custom palettes.',
    traceSteps: [
      { line: 13, explanation: 'User selects "Ocean Blue" RadioButton inside GroupBox.', variables: { 'rad.Text': '"Ocean Blue"', 'rad.Checked': true }, callStack: 'radTheme_CheckedChanged' },
      { line: 18, explanation: 'Assign this.BackColor = Color.FromArgb(220, 235, 252). Form instantly repaints.', variables: { 'this.BackColor': 'Ocean Blue' }, outputLog: 'Form background updated to Ocean Blue.' }
    ],
    simulatedOutput: [
      'Form Loaded: GroupBox Theme Selector',
      'Radio Selection: Ocean Blue -> BackColor set to RGB(220, 235, 252)',
      'Radio Selection: Dark Studio -> BackColor set to RGB(30, 41, 59)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add GroupBox', description: 'Drag GroupBox from Containers category in Toolbox onto Form.' },
      { stepNumber: 2, title: 'Add RadioButtons', description: 'Drag RadioButtons INSIDE the GroupBox boundaries.' },
      { stepNumber: 3, title: 'Attach Shared Event', description: 'Select all radio buttons and assign their CheckedChanged event to radTheme_CheckedChanged.' }
    ],
    vivaQuestions: [
      { question: 'Why is GroupBox called a Container Control?', shortAnswer: 'It visually and logically groups related controls together, ensuring RadioButtons inside it are mutually exclusive.', detailedAnswer: 'Controls inside a GroupBox move together when the GroupBox is dragged, and child controls inherit visibility and enabled state from the parent container.' }
    ],
    emulatorType: 'groupbox-theme'
  },
  {
    id: 15,
    title: 'ComboBox Cascading Countries & States Dropdown',
    aim: 'To populate a ComboBox with countries and dynamically load corresponding states/cities into a second ComboBox based on the selected country index.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ComboBox', 'SelectedIndexChanged', 'Data Binding', 'Cascading'],
    algorithm: [
      'Create Form with two ComboBoxes: `cmbCountry` and `cmbState`.',
      'In Form_Load, populate `cmbCountry` with "India", "USA", "UK", "Canada", "Australia".',
      'Handle `cmbCountry_SelectedIndexChanged` event.',
      'Clear `cmbState.Items.Clear();`.',
      'Use `switch` or dictionary lookup to load matching state names into `cmbState`.',
      'Enable `cmbState` and set `SelectedIndex = 0`.'
    ],
    code: `using System;
using System.Collections.Generic;
using System.Windows.Forms;

public partial class FormCascadingCombo : Form
{
    private Dictionary<string, string[]> stateDatabase = new Dictionary<string, string[]>
    {
        { "India", new string[] { "Karnataka", "Maharashtra", "Tamil Nadu", "Delhi", "Gujarat", "Kerala" } },
        { "United States", new string[] { "California", "Texas", "New York", "Florida", "Washington" } },
        { "United Kingdom", new string[] { "England", "Scotland", "Wales", "Northern Ireland" } },
        { "Canada", new string[] { "Ontario", "Quebec", "British Columbia", "Alberta" } }
    };

    public FormCascadingCombo()
    {
        InitializeComponent();
    }

    private void FormCascadingCombo_Load(object sender, EventArgs e)
    {
        cmbCountry.Items.Clear();
        foreach (var country in stateDatabase.Keys)
        {
            cmbCountry.Items.Add(country);
        }
        cmbCountry.SelectedIndex = 0; // Trigger initial cascade
    }

    private void cmbCountry_SelectedIndexChanged(object sender, EventArgs e)
    {
        string selectedCountry = cmbCountry.SelectedItem?.ToString();
        cmbState.Items.Clear();

        if (!string.IsNullOrEmpty(selectedCountry) && stateDatabase.ContainsKey(selectedCountry))
        {
            cmbState.Items.AddRange(stateDatabase[selectedCountry]);
            cmbState.Enabled = true;
            cmbState.SelectedIndex = 0;
        }
        else
        {
            cmbState.Enabled = false;
        }

        UpdateSelectionLabel();
    }

    private void cmbState_SelectedIndexChanged(object sender, EventArgs e)
    {
        UpdateSelectionLabel();
    }

    private void UpdateSelectionLabel()
    {
        lblResult.Text = $"Selected Location: {cmbState.SelectedItem}, {cmbCountry.SelectedItem}";
    }
}`,
    codeExplanation: 'Demonstrates cascading dropdown logic using SelectedIndexChanged event, Dictionary lookup, and Items.AddRange() method.',
    traceSteps: [
      { line: 26, explanation: 'Form_Load initializes cmbCountry with 4 country keys.', variables: { countriesCount: 4 }, callStack: 'Form_Load' },
      { line: 33, explanation: 'User selects "India" -> cmbCountry_SelectedIndexChanged fires.', variables: { selectedCountry: '"India"' }, callStack: 'cmbCountry_SelectedIndexChanged' },
      { line: 38, explanation: 'Load 6 Indian states (Karnataka, Maharashtra...) into cmbState.', variables: { 'cmbState.Items.Count': 6, 'cmbState.SelectedIndex': 0 }, outputLog: 'State dropdown populated with Indian states.' }
    ],
    simulatedOutput: [
      'Form Loaded: Cascading ComboBox Selector',
      'Country selected: India -> Loaded states: [Karnataka, Maharashtra, Tamil Nadu, Delhi, Gujarat, Kerala]',
      'Current Location: Karnataka, India'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ComboBox Controls', description: 'Add two ComboBoxes named cmbCountry and cmbState with DropDownStyle = DropDownList.' },
      { stepNumber: 2, title: 'Form Load Event', description: 'Double click Form background to generate Form_Load and populate cmbCountry.' },
      { stepNumber: 3, title: 'SelectedIndexChanged', description: 'Double click cmbCountry and add the dictionary lookup logic to populate cmbState.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between DropDown and DropDownList in ComboBox?', shortAnswer: 'DropDown allows the user to type custom text, while DropDownList restricts the user to selecting existing items only.', detailedAnswer: 'Setting DropDownStyle to ComboBoxStyle.DropDownList prevents arbitrary user typing, ensuring strict data integrity.' }
    ],
    emulatorType: 'combobox-cascading'
  },
  {
    id: 16,
    title: 'Standard Grid-Layout Calculator',
    aim: 'To design a fully functional WinForms Desktop Calculator with a numeric keypad, operations (+, -, *, /, %, √), decimal handling, and clear/backspace buttons.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    tags: ['WinForms', 'TableLayoutPanel', 'Calculator', 'State Machine', 'Arithmetic'],
    algorithm: [
      'Design Calculator UI with a display TextBox `txtDisplay` and button grid for digits 0-9 and operators.',
      'Maintain variables: `double operand1 = 0;`, `string operation = \"\";`, `bool isOperationPerformed = false;`.',
      'When digit button clicked: if `isOperationPerformed` is true, clear display and write digit; else append digit.',
      'When operator (+, -, *, /) clicked: store `operand1 = double.Parse(txtDisplay.Text);`, store operator, set `isOperationPerformed = true`.',
      'When \'=\' clicked: evaluate result based on stored operator and display result.',
      'Support square root (√) and percentage (%) operations immediately.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormCalculator : Form
{
    private double resultValue = 0;
    private string operationPerformed = "";
    private bool isOperationClicked = false;

    public FormCalculator()
    {
        InitializeComponent();
    }

    private void btnDigit_Click(object sender, EventArgs e)
    {
        Button btn = (Button)sender;

        if (txtDisplay.Text == "0" || isOperationClicked)
            txtDisplay.Clear();

        isOperationClicked = false;

        if (btn.Text == ".")
        {
            if (!txtDisplay.Text.Contains("."))
                txtDisplay.Text += ".";
        }
        else
        {
            txtDisplay.Text += btn.Text;
        }
    }

    private void btnOperator_Click(object sender, EventArgs e)
    {
        Button btn = (Button)sender;

        if (resultValue != 0)
        {
            btnEquals_Click(sender, e);
            operationPerformed = btn.Text;
            isOperationClicked = true;
        }
        else
        {
            operationPerformed = btn.Text;
            resultValue = double.Parse(txtDisplay.Text);
            isOperationClicked = true;
        }
        lblEquation.Text = $"{resultValue} {operationPerformed}";
    }

    private void btnEquals_Click(object sender, EventArgs e)
    {
        double secondOperand = double.Parse(txtDisplay.Text);

        switch (operationPerformed)
        {
            case "+": txtDisplay.Text = (resultValue + secondOperand).ToString(); break;
            case "-": txtDisplay.Text = (resultValue - secondOperand).ToString(); break;
            case "×": txtDisplay.Text = (resultValue * secondOperand).ToString(); break;
            case "÷":
                if (secondOperand == 0)
                {
                    MessageBox.Show("Cannot divide by Zero!", "Math Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txtDisplay.Text = "0";
                }
                else
                    txtDisplay.Text = (resultValue / secondOperand).ToString();
                break;
            case "%": txtDisplay.Text = (resultValue % secondOperand).ToString(); break;
        }

        lblEquation.Text = "";
        resultValue = 0;
        operationPerformed = "";
    }

    private void btnClear_Click(object sender, EventArgs e)
    {
        txtDisplay.Text = "0";
        resultValue = 0;
        operationPerformed = "";
        lblEquation.Text = "";
    }

    private void btnSqrt_Click(object sender, EventArgs e)
    {
        double val = double.Parse(txtDisplay.Text);
        if (val < 0)
        {
            MessageBox.Show("Invalid Input for Square Root!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }
        txtDisplay.Text = Math.Sqrt(val).ToString();
    }
}`,
    codeExplanation: 'Implements an accumulator and single-register calculator logic. Shares unified btnDigit_Click and btnOperator_Click handlers across all keypad buttons.',
    traceSteps: [
      { line: 18, explanation: 'User clicks button "7" -> txtDisplay displays "7".', variables: { 'txtDisplay.Text': '"7"' }, callStack: 'btnDigit_Click' },
      { line: 36, explanation: 'User clicks "+" operator -> Store resultValue = 7, operation = "+".', variables: { resultValue: 7, operationPerformed: '"+"' }, callStack: 'btnOperator_Click' },
      { line: 18, explanation: 'User clicks button "8" -> txtDisplay displays "8".', variables: { 'txtDisplay.Text': '"8"' }, callStack: 'btnDigit_Click' },
      { line: 55, explanation: 'User clicks "=" -> evaluate 7 + 8 = 15.', variables: { result: 15 }, outputLog: 'txtDisplay updated to 15.' }
    ],
    simulatedOutput: [
      'Input: 7',
      'Operator: +',
      'Input: 8',
      'Equals: 7 + 8 = 15',
      'Square Root of 144 = 12'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form and TableLayoutPanel', description: 'Add a TableLayoutPanel with 5 rows and 4 columns to create a clean button grid.' },
      { stepNumber: 2, title: 'Assign Shared Events', description: 'Assign all number buttons 0-9 to btnDigit_Click and arithmetic operators to btnOperator_Click.' },
      { stepNumber: 3, title: 'Add Display', description: 'Set TextBox txtDisplay: Font = Segoe UI 18pt, ReadOnly = True, TextAlign = Right.' }
    ],
    vivaQuestions: [
      { question: 'Why is it better to use a single event handler for all digit buttons in WinForms?', shortAnswer: 'It drastically reduces redundant code and centralizes UI handling through sender casting.', detailedAnswer: 'By casting (Button)sender in btnDigit_Click, one single method cleanly serves buttons 0 through 9.' }
    ],
    emulatorType: 'grid-calculator'
  },
  {
    id: 17,
    title: 'CheckBox Hobbies Selection to ListBox Transfer',
    aim: 'To write a Windows Forms program with multiple CheckBoxes representing hobbies and skills, transferring selected items into a ListBox with count tracking.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'CheckBox', 'ListBox', 'Items Collection', 'Dynamic List'],
    algorithm: [
      'Place CheckBoxes for hobbies: Coding, Chess, Photography, Swimming, Music, Reading.',
      'Place a ListBox `lstSelected` and a Button `btnTransfer` (\"Update Hobbies\").',
      'In `btnTransfer_Click`, clear `lstSelected.Items.Clear();`.',
      'Iterate through all CheckBoxes in the GroupBox; if `chk.Checked == true`, add `chk.Text` into ListBox.',
      'Display total count of selected hobbies in a Label.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormHobbies : Form
{
    public FormHobbies()
    {
        InitializeComponent();
    }

    private void btnUpdateHobbies_Click(object sender, EventArgs e)
    {
        lstSelectedHobbies.Items.Clear();

        // Check each checkbox status
        if (chkCoding.Checked) lstSelectedHobbies.Items.Add("💻 C# & Python Coding");
        if (chkChess.Checked) lstSelectedHobbies.Items.Add("♟️ Competitive Chess");
        if (chkPhoto.Checked) lstSelectedHobbies.Items.Add("📷 Digital Photography");
        if (chkMusic.Checked) lstSelectedHobbies.Items.Add("🎵 Music & Guitar");
        if (chkGaming.Checked) lstSelectedHobbies.Items.Add("🎮 Game Development");
        if (chkReading.Checked) lstSelectedHobbies.Items.Add("📚 Technical Books");

        lblCount.Text = $"Total Hobbies Selected: {lstSelectedHobbies.Items.Count}";

        if (lstSelectedHobbies.Items.Count == 0)
        {
            MessageBox.Show("No hobbies were selected!", "Notice", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }

    private void btnRemoveSelected_Click(object sender, EventArgs e)
    {
        if (lstSelectedHobbies.SelectedIndex != -1)
        {
            lstSelectedHobbies.Items.RemoveAt(lstSelectedHobbies.SelectedIndex);
            lblCount.Text = $"Total Hobbies Selected: {lstSelectedHobbies.Items.Count}";
        }
    }

    private void btnSelectAll_Click(object sender, EventArgs e)
    {
        chkCoding.Checked = true;
        chkChess.Checked = true;
        chkPhoto.Checked = true;
        chkMusic.Checked = true;
        chkGaming.Checked = true;
        chkReading.Checked = true;
    }
}`,
    codeExplanation: 'Illustrates multi-select input via CheckBoxes and managing the System.Windows.Forms.ListBox.ObjectCollection.',
    traceSteps: [
      { line: 15, explanation: 'User checks Coding, Chess, Music. Click Update.', variables: { checkedCount: 3 }, callStack: 'btnUpdateHobbies_Click' },
      { line: 24, explanation: 'ListBox items collection receives 3 items.', variables: { 'lstSelectedHobbies.Items.Count': 3 }, outputLog: 'Updated ListBox with 3 hobbies.' }
    ],
    simulatedOutput: [
      'Form Loaded: Hobbies Collector',
      'Checked: Coding, Music, Gaming',
      'ListBox populated with 3 items.',
      'Total Hobbies Selected: 3'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Place CheckBoxes in GroupBox', description: 'Add 6 CheckBoxes inside a GroupBox named "Choose Interests".' },
      { stepNumber: 2, title: 'Add ListBox and Buttons', description: 'Add ListBox lstSelectedHobbies and Buttons (Update, Remove Selected, Select All).' },
      { stepNumber: 3, title: 'Execute Transfer', description: 'Add items to ListBox on button click.' }
    ],
    vivaQuestions: [
      { question: 'What is the main functional difference between RadioButtons and CheckBoxes?', shortAnswer: 'RadioButtons are mutually exclusive within a container (only one can be chosen); CheckBoxes allow multiple independent selections.', detailedAnswer: 'RadioButtons represent single choice logic (e.g. Gender, Marital Status), while CheckBoxes represent independent boolean toggles (e.g. Hobbies, Feature Flags).' }
    ],
    emulatorType: 'checkbox-hobbies'
  },
  {
    id: 18,
    title: 'Odd and Even Number Splitter into Dual ListBoxes',
    aim: 'To take a list of integers from a user, process them sequentially, and split them into two separate ListBoxes: one for Odd numbers and one for Even numbers with sum totals.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ListBox', 'Modulo Logic', 'Data Separation', 'Collections'],
    algorithm: [
      'Design Form with TextBox `txtNumberInput`, Button `btnAdd`, Button `btnSplit`, ListBox `lstAll`, ListBox `lstEven`, ListBox `lstOdd`.',
      'When `btnAdd` clicked: validate integer and add into `lstAll`.',
      'When `btnSplit` clicked: clear `lstEven` and `lstOdd`.',
      'Loop through each item in `lstAll.Items`: if `item % 2 == 0`, add to `lstEven` else add to `lstOdd`.',
      'Calculate and display sums and counts for both odd and even lists.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormOddEvenSplitter : Form
{
    public FormOddEvenSplitter()
    {
        InitializeComponent();
    }

    private void btnAdd_Click(object sender, EventArgs e)
    {
        if (int.TryParse(txtNumber.Text.Trim(), out int num))
        {
            lstAllNumbers.Items.Add(num);
            txtNumber.Clear();
            txtNumber.Focus();
        }
        else
        {
            MessageBox.Show("Please enter a valid integer!", "Invalid Input", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void btnSplit_Click(object sender, EventArgs e)
    {
        lstEven.Items.Clear();
        lstOdd.Items.Clear();

        int evenSum = 0, oddSum = 0;

        foreach (var item in lstAllNumbers.Items)
        {
            int val = Convert.ToInt32(item);
            if (val % 2 == 0)
            {
                lstEven.Items.Add(val);
                evenSum += val;
            }
            else
            {
                lstOdd.Items.Add(val);
                oddSum += val;
            }
        }

        lblEvenSummary.Text = $"Even Count: {lstEven.Items.Count} | Sum: {evenSum}";
        lblOddSummary.Text = $"Odd Count: {lstOdd.Items.Count} | Sum: {oddSum}";
    }

    private void btnClearAll_Click(object sender, EventArgs e)
    {
        lstAllNumbers.Items.Clear();
        lstEven.Items.Clear();
        lstOdd.Items.Clear();
        lblEvenSummary.Text = "Even Count: 0";
        lblOddSummary.Text = "Odd Count: 0";
    }
}`,
    codeExplanation: 'Iterates through ListBox items collection, performs modulo division val % 2 == 0, and dispatches integers into specialized target list controls.',
    traceSteps: [
      { line: 26, explanation: 'Begin split iteration over lstAllNumbers with 6 items: [12, 7, 24, 33, 50, 9].', variables: { totalItems: 6 }, callStack: 'btnSplit_Click' },
      { line: 31, explanation: 'Item 12 is Even -> lstEven.Items.Add(12), evenSum = 12.', variables: { evenSum: 12 }, callStack: 'btnSplit_Click' },
      { line: 36, explanation: 'Item 7 is Odd -> lstOdd.Items.Add(7), oddSum = 7.', variables: { oddSum: 7 }, callStack: 'btnSplit_Click' },
      { line: 43, explanation: 'Final summary: 3 Even numbers (sum=86), 3 Odd numbers (sum=49).', variables: { evenCount: 3, oddCount: 3 }, outputLog: 'Split complete.' }
    ],
    simulatedOutput: [
      'Input list: 12, 7, 24, 33, 50, 9',
      'Even List: [12, 24, 50] (Count: 3, Sum: 86)',
      'Odd List: [7, 33, 9] (Count: 3, Sum: 49)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Layout', description: 'Place 3 ListBoxes: lstAllNumbers, lstEven, lstOdd with descriptive headers.' },
      { stepNumber: 2, title: 'Add Number Event', description: 'Use int.TryParse to safely add integers from TextBox.' },
      { stepNumber: 3, title: 'Split Logic', description: 'Iterate over items using foreach and modulo arithmetic.' }
    ],
    vivaQuestions: [
      { question: 'Why does ListBox.Items store objects rather than integers in WinForms?', shortAnswer: 'ListBox is a generalized control designed to bind any .NET object.', detailedAnswer: 'ListBox.Items is an ObjectCollection. When displaying, it calls the object\'s .ToString() method. We cast with Convert.ToInt32(item) to retrieve the raw numeric value.' }
    ],
    emulatorType: 'oddeven-listbox'
  },
  {
    id: 19,
    title: 'Word & Sentence Analyzer: Vowels, Words & Palindrome',
    aim: 'To create a WinForms text analysis application that computes total characters, word count, vowels, consonants, digits, special characters, and checks if text is a palindrome.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'Char Analysis', 'LINQ', 'Palindrome', 'Vowels'],
    algorithm: [
      'Add multiline TextBox `txtInput` with `TextChanged` event or Analyze button.',
      'Count total characters and non-whitespace characters.',
      'Split words by whitespace characters and count.',
      'Iterate through characters: classify into Vowels (A, E, I, O, U), Consonants, Digits, and Symbols.',
      'Check palindrome by comparing cleaned string with reversed character sequence.',
      'Render live progress bars and data grid/labels.'
    ],
    code: `using System;
using System.Linq;
using System.Windows.Forms;

public partial class FormTextAnalyzer : Form
{
    public FormTextAnalyzer()
    {
        InitializeComponent();
    }

    private void btnAnalyze_Click(object sender, EventArgs e)
    {
        string text = txtSource.Text;

        if (string.IsNullOrWhiteSpace(text))
        {
            MessageBox.Show("Please enter some text to analyze!", "Notice", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return;
        }

        int charCount = text.Length;
        int vowels = 0, consonants = 0, digits = 0, spaces = 0, special = 0;
        string vowelSet = "aeiouAEIOU";

        foreach (char c in text)
        {
            if (char.IsLetter(c))
            {
                if (vowelSet.Contains(c)) vowels++;
                else consonants++;
            }
            else if (char.IsDigit(c)) digits++;
            else if (char.IsWhiteSpace(c)) spaces++;
            else special++;
        }

        string[] words = text.Split(new char[] { ' ', '\\t', '\\n', '\\r' }, StringSplitOptions.RemoveEmptyEntries);

        // Palindrome check (alphanumeric only)
        string clean = new string(text.Where(char.IsLetterOrDigit).Select(char.ToLower).ToArray());
        string reversed = new string(clean.Reverse().ToArray());
        bool isPalindrome = (clean.Length > 0 && clean == reversed);

        // Update Labels
        lblChars.Text = $"Total Characters: {charCount}";
        lblWords.Text = $"Word Count: {words.Length}";
        lblVowels.Text = $"Vowels: {vowels}";
        lblConsonants.Text = $"Consonants: {consonants}";
        lblDigits.Text = $"Digits: {digits}";
        lblSpecial.Text = $"Special Symbols: {special}";
        lblPalindrome.Text = $"Is Palindrome?: {(isPalindrome ? "YES (Palindrome)" : "NO")}";
    }
}`,
    codeExplanation: 'Combines char classification methods (char.IsLetter, char.IsDigit) with LINQ queries for palindrome detection.',
    traceSteps: [
      { line: 13, explanation: 'Analyze string: "A man, a plan, a canal: Panama!".', variables: { length: 30 }, callStack: 'btnAnalyze_Click' },
      { line: 36, explanation: 'Extract cleaned alphanumeric: "amanaplanacanalpanama".', variables: { clean: '"amanaplanacanalpanama"' }, callStack: 'btnAnalyze_Click' },
      { line: 38, explanation: 'Reversed matches clean -> isPalindrome = true.', variables: { isPalindrome: true, words: 8 }, outputLog: 'Analysis: 10 vowels, 11 consonants, Palindrome=TRUE' }
    ],
    simulatedOutput: [
      'Input: "A man, a plan, a canal: Panama!"',
      'Characters: 31 | Words: 8',
      'Vowels: 10 | Consonants: 11 | Special: 4',
      'Palindrome: YES'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Design', description: 'Place Multiline TextBox, Analyze Button, and a GroupBox containing analysis metrics.' },
      { stepNumber: 2, title: 'Wire Analysis Logic', description: 'Implement character-by-character classification and LINQ reverse check.' }
    ],
    vivaQuestions: [
      { question: 'What is char.IsLetterOrDigit used for in C#?', shortAnswer: 'It returns true if the character is categorized as a Unicode letter or decimal digit.', detailedAnswer: 'It filters out punctuation, whitespace, and symbols, which is crucial for authentic grammatical palindrome checks.' }
    ],
    emulatorType: 'palindrome-analyzer'
  },
  {
    id: 20,
    title: 'Dynamic To-Do Task Manager with Priorities',
    aim: 'To develop a desktop To-Do List Application in WinForms allowing users to add tasks with priority (High, Medium, Low), mark as completed, delete, and clear all.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    tags: ['WinForms', 'CheckedListBox', 'Task Management', 'CRUD', 'UI State'],
    algorithm: [
      'Add TextBox `txtTask`, ComboBox `cmbPriority` (High, Medium, Low), and CheckedListBox `clbTasks`.',
      'Add Buttons: Add Task, Remove Selected, Mark Done, Clear All.',
      'When Add Task clicked: validate task text; append formatted string `\"[HIGH] Finish C# Lab\"` into `clbTasks.Items`.',
      'When item checked in `clbTasks.ItemCheck`, update completed counter.',
      'When Remove clicked, remove checked items from collection.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormTaskManager : Form
{
    public FormTaskManager()
    {
        InitializeComponent();
        cmbPriority.SelectedIndex = 1; // Default: Medium
    }

    private void btnAddTask_Click(object sender, EventArgs e)
    {
        string task = txtTask.Text.Trim();
        if (string.IsNullOrEmpty(task))
        {
            MessageBox.Show("Please enter a task description!", "Empty Task", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        string priority = cmbPriority.SelectedItem.ToString();
        string badge = priority == "High" ? "🔴 [HIGH]" : (priority == "Medium" ? "🟡 [MED]" : "🟢 [LOW]");

        clbTasks.Items.Add($"{badge} {task}", false);
        txtTask.Clear();
        txtTask.Focus();
        UpdateProgress();
    }

    private void btnRemoveSelected_Click(object sender, EventArgs e)
    {
        for (int i = clbTasks.CheckedIndices.Count - 1; i >= 0; i--)
        {
            clbTasks.Items.RemoveAt(clbTasks.CheckedIndices[i]);
        }
        UpdateProgress();
    }

    private void clbTasks_ItemCheck(object sender, ItemCheckEventArgs e)
    {
        this.BeginInvoke((MethodInvoker)delegate { UpdateProgress(); });
    }

    private void UpdateProgress()
    {
        int total = clbTasks.Items.Count;
        int completed = clbTasks.CheckedItems.Count;
        lblStats.Text = $"Completed: {completed} / {total} Tasks";
        prgTasks.Value = total > 0 ? (int)((completed / (double)total) * 100) : 0;
    }
}`,
    codeExplanation: 'Uses CheckedListBox control, manages dynamic item removals from highest index downwards to prevent index shifting errors, and updates a visual ProgressBar.',
    traceSteps: [
      { line: 15, explanation: 'Add task "[HIGH] Complete ADO.NET Assignment".', variables: { 'clbTasks.Items.Count': 1 }, callStack: 'btnAddTask_Click' },
      { line: 36, explanation: 'User checks 1 task -> ItemCheck event updates progress bar to 100%.', variables: { completed: 1, total: 1, progress: 100 }, outputLog: 'Progress: 1/1 Completed.' }
    ],
    simulatedOutput: [
      'Task Added: 🔴 [HIGH] Complete ADO.NET Assignment',
      'Task Added: 🟡 [MED] Review Crystal Reports',
      'Checked: 1 task complete -> Progress: 50%'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add CheckedListBox', description: 'Drag CheckedListBox clbTasks from Toolbox onto Form.' },
      { stepNumber: 2, title: 'Add Priority Dropdown', description: 'Add ComboBox with items High, Medium, Low.' },
      { stepNumber: 3, title: 'Wire Events', description: 'Code Add, Remove, and ItemCheck event handlers.' }
    ],
    vivaQuestions: [
      { question: 'Why iterate backwards when deleting items from a ListBox by index?', shortAnswer: 'Deleting an item shifts the indexes of all subsequent items; iterating backwards preserves unvisited indices.', detailedAnswer: 'If you delete from index 0 forwards, index 1 becomes index 0, causing the next iteration to skip an item or throw ArgumentOutOfRangeException.' }
    ],
    emulatorType: 'todo-list'
  },
  {
    id: 21,
    title: 'RadioButtons Profile Questionnaire Form',
    aim: 'To construct an interactive profile survey form utilizing distinct GroupBoxes for Gender, Qualification, Employment Status, and Preferred Role with summary generation.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'RadioButton', 'Multiple GroupBoxes', 'Questionnaire', 'Survey'],
    algorithm: [
      'Place 3 GroupBoxes on Form: Group 1 (Gender), Group 2 (Education), Group 3 (Experience Level).',
      'Add respective RadioButtons inside each GroupBox.',
      'Add Submit Button `btnGenerateProfile`.',
      'In click handler, inspect `Checked` property for radio buttons in each group.',
      'Format full candidate profile and display in RichTextBox or MessageBox.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormSurvey : Form
{
    public FormSurvey()
    {
        InitializeComponent();
    }

    private void btnSubmit_Click(object sender, EventArgs e)
    {
        // 1. Gender Group
        string gender = radMale.Checked ? "Male" : (radFemale.Checked ? "Female" : (radOther.Checked ? "Other" : "Not Selected"));

        // 2. Education Group
        string education = "Not Selected";
        if (radBCA.Checked) education = "Bachelor of Computer Applications (BCA)";
        else if (radBTech.Checked) education = "B.Tech Computer Science";
        else if (radMCA.Checked) education = "Master of Computer Applications (MCA)";
        else if (radBSc.Checked) education = "B.Sc Information Technology";

        // 3. Experience Group
        string exp = radFresher.Checked ? "Fresher (0 Years)" : (radJunior.Checked ? "1 - 2 Years" : "3+ Years (Senior)");

        string profile = $"================ CANDIDATE PROFILE ================\\n" +
                         $"Candidate Name    : {txtName.Text}\\n" +
                         $"Gender            : {gender}\\n" +
                         $"Highest Degree    : {education}\\n" +
                         $"Experience Level  : {exp}\\n" +
                         $"Registered Date   : {DateTime.Now:dd-MM-yyyy HH:mm}\\n" +
                         $"===================================================";

        txtSummary.Text = profile;
    }
}`,
    codeExplanation: 'Demonstrates multiple independent RadioButton clusters by enclosing them inside dedicated GroupBox parent containers.',
    traceSteps: [
      { line: 13, explanation: 'Evaluate radFemale.Checked = true -> Gender = "Female".', variables: { gender: '"Female"' }, callStack: 'btnSubmit_Click' },
      { line: 17, explanation: 'Evaluate radBCA.Checked = true -> Education = "BCA".', variables: { education: '"BCA"' }, callStack: 'btnSubmit_Click' },
      { line: 24, explanation: 'Construct full profile card and populate txtSummary.', variables: { profileRendered: true }, outputLog: 'Profile generated successfully.' }
    ],
    simulatedOutput: [
      'Candidate Name: Sneha Sharma',
      'Gender: Female | Degree: BCA | Experience: Fresher (0 Years)',
      'Candidate Profile generated.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create GroupBoxes', description: 'Create 3 separate GroupBoxes on the Form.' },
      { stepNumber: 2, title: 'Nest RadioButtons', description: 'Place RadioButtons inside their corresponding GroupBox to ensure exclusivity.' },
      { stepNumber: 3, title: 'Generate Profile', description: 'Collect selections on Submit button click.' }
    ],
    vivaQuestions: [
      { question: 'How do you create two sets of mutually exclusive RadioButtons on the same Windows Form?', shortAnswer: 'By placing each set of RadioButtons inside separate container controls like GroupBox or Panel.', detailedAnswer: 'WinForms automatically makes all RadioButtons sharing the same direct parent container mutually exclusive.' }
    ],
    emulatorType: 'radio-questionnaire'
  },
  {
    id: 22,
    title: 'DateTimePicker & Age / Work Experience Calculator',
    aim: 'To build a Windows Form using the DateTimePicker control to select Date of Birth and calculate precise Age in Years, Months, and Days, along with Retirement countdown.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'DateTimePicker', 'DateTime', 'TimeSpan', 'Date Math'],
    algorithm: [
      'Add `DateTimePicker` control `dtpDOB` with `MaxDate = DateTime.Today`.',
      'Add Button `btnCalculateAge` and summary Labels.',
      'In click event: extract selected date `DateTime dob = dtpDOB.Value;`.',
      'Calculate difference between `DateTime.Today` and `dob`.',
      'Compute years, months, and days accurately accounting for leap years.',
      'Calculate approximate days left until 60th birthday (retirement age).'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormAgeCalculator : Form
{
    public FormAgeCalculator()
    {
        InitializeComponent();
        dtpDOB.MaxDate = DateTime.Today;
    }

    private void btnCalculate_Click(object sender, EventArgs e)
    {
        DateTime dob = dtpDOB.Value.Date;
        DateTime today = DateTime.Today;

        if (dob > today)
        {
            MessageBox.Show("Date of birth cannot be in the future!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        int years = today.Year - dob.Year;
        int months = today.Month - dob.Month;
        int days = today.Day - dob.Day;

        if (days < 0)
        {
            months--;
            days += DateTime.DaysInMonth(today.Year, (today.Month == 1 ? 12 : today.Month - 1));
        }
        if (months < 0)
        {
            years--;
            months += 12;
        }

        DateTime nextBirthday = dob.AddYears(years + 1);
        int daysToNextBirthday = (nextBirthday - today).Days;

        lblAgeResult.Text = $"Exact Age: {years} Years, {months} Months, {days} Days";
        lblNextBirthday.Text = $"Next Birthday in: {daysToNextBirthday} Days ({nextBirthday:dd-MMM-yyyy})";
        lblTotalDays.Text = $"Total Days Lived: {(today - dob).TotalDays:N0} Days";
    }
}`,
    codeExplanation: 'Demonstrates DateTimePicker control, DateTime arithmetic, TimeSpan calculation, and DaysInMonth leap-aware adjustments.',
    traceSteps: [
      { line: 13, explanation: 'Read selected DOB = 15-Aug-2003.', variables: { dob: '"2003-08-15"' }, callStack: 'btnCalculate_Click' },
      { line: 22, explanation: 'Compute age components: 22 Years, 7 Months, 3 Days.', variables: { years: 22, months: 7, days: 3 }, outputLog: 'Exact Age: 22 Years, 7 Months, 3 Days' }
    ],
    simulatedOutput: [
      'DOB Selected: 15-Aug-2003',
      'Exact Age: 22 Years, 7 Months, 3 Days',
      'Next Birthday in: 178 Days'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add DateTimePicker', description: 'Drag DateTimePicker dtpDOB onto the Form. Set Format = Custom, CustomFormat = dd-MMM-yyyy.' },
      { stepNumber: 2, title: 'Calculate Age', description: 'Implement date subtraction and leap-year safe month handling in button click.' }
    ],
    vivaQuestions: [
      { question: 'What is the DateTimePicker.Format property used for in WinForms?', shortAnswer: 'It specifies how the date/time is visually displayed (Long, Short, Time, or Custom).', detailedAnswer: 'Setting Format to DateTimePickerFormat.Custom allows formatting patterns like "dd/MM/yyyy hh:mm tt".' }
    ],
    emulatorType: 'datetime-picker'
  },
  {
    id: 23,
    title: 'MonthCalendar & Date Interval Range Difference',
    aim: 'To implement a Leave / Event Interval Range Calculator using MonthCalendar control to select start/end dates and compute working days, weekends, and holidays.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'MonthCalendar', 'SelectionRange', 'Business Days', 'Calendar'],
    algorithm: [
      'Add `MonthCalendar` control `calRange` with `MaxSelectionCount = 60`.',
      'Handle `calRange.DateChanged` event.',
      'Retrieve `DateTime start = calRange.SelectionStart;` and `DateTime end = calRange.SelectionEnd;`.',
      'Count total calendar days, Saturday/Sunday weekends, and working business days.',
      'Display leave summary in a visual dashboard.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormCalendarDemo : Form
{
    public FormCalendarDemo()
    {
        InitializeComponent();
        calRange.MaxSelectionCount = 90;
    }

    private void calRange_DateChanged(object sender, DateRangeEventArgs e)
    {
        DateTime start = calRange.SelectionStart;
        DateTime end = calRange.SelectionEnd;

        int totalDays = (end - start).Days + 1;
        int businessDays = 0;
        int weekendDays = 0;

        for (DateTime date = start; date <= end; date = date.AddDays(1))
        {
            if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
                weekendDays++;
            else
                businessDays++;
        }

        lblStart.Text = $"From : {start:dd-MMM-yyyy}";
        lblEnd.Text = $"To   : {end:dd-MMM-yyyy}";
        lblTotal.Text = $"Total Duration  : {totalDays} Day(s)";
        lblBusiness.Text = $"Working Days    : {businessDays} Day(s)";
        lblWeekends.Text = $"Weekend Days    : {weekendDays} Day(s)";
    }
}`,
    codeExplanation: 'Leverages MonthCalendar SelectionStart and SelectionEnd properties with a day-by-day DayOfWeek inspection loop.',
    traceSteps: [
      { line: 13, explanation: 'User selects range: 10-Oct-2026 to 24-Oct-2026 (15 days).', variables: { totalDays: 15 }, callStack: 'calRange_DateChanged' },
      { line: 20, explanation: 'Count business days = 11, weekend days = 4.', variables: { businessDays: 11, weekendDays: 4 }, outputLog: 'Calculated 11 working days.' }
    ],
    simulatedOutput: [
      'Range Selected: 10-Oct-2026 to 24-Oct-2026',
      'Total Days: 15 | Working Days: 11 | Weekend Days: 4'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add MonthCalendar', description: 'Add MonthCalendar calRange and set MaxSelectionCount = 90.' },
      { stepNumber: 2, title: 'Handle DateChanged', description: 'Double click MonthCalendar to generate DateChanged event.' }
    ],
    vivaQuestions: [
      { question: 'What property of MonthCalendar allows multi-day range selection?', shortAnswer: 'The MaxSelectionCount property (default is 7 days).', detailedAnswer: 'By increasing MaxSelectionCount, users can drag across weeks or months to select large date ranges.' }
    ],
    emulatorType: 'calendar-diff'
  },
  {
    id: 24,
    title: 'GDI+ 2D Shape Drawing: Circles, Rectangles & Brushes',
    aim: 'To build a GDI+ 2D Graphics Drawing Studio in Windows Forms that overrides the Form OnPaint method to render anti-aliased Circles, Rectangles, Ellipses, LinearGradientBrushes, and custom Pens.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    tags: ['GDI+', 'System.Drawing', 'Graphics', 'Paint Event', 'Brushes & Pens'],
    algorithm: [
      'Create custom Panel or override Form `OnPaint(PaintEventArgs e)`.',
      'Obtain `Graphics g = e.Graphics;` and enable `SmoothingMode.AntiAlias`.',
      'Create `Pen` objects for stroked outlines and `SolidBrush`/`LinearGradientBrush` for filled shapes.',
      'Draw Rectangle using `g.DrawRectangle(pen, x, y, width, height)`.',
      'Draw and fill Ellipse/Circle using `g.FillEllipse(brush, ...)` and `g.DrawEllipse(...)`.',
      'Draw custom gradient banner and formatted text using `g.DrawString(...)`.',
      'Provide buttons to dynamically alter shape dimensions and trigger `this.Invalidate()`.'
    ],
    code: `using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

public partial class FormGdiDrawing : Form
{
    private string currentShape = "All";
    private Color strokeColor = Color.Blue;
    private Color fillColor = Color.LightSkyBlue;

    public FormGdiDrawing()
    {
        InitializeComponent();
        this.DoubleBuffered = true;
    }

    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);
        Graphics g = e.Graphics;
        g.SmoothingMode = SmoothingMode.AntiAlias;

        using (Pen pen = new Pen(strokeColor, 3))
        using (SolidBrush brush = new SolidBrush(fillColor))
        {
            // 1. Draw Linear Gradient Header
            Rectangle headerRect = new Rectangle(20, 20, this.ClientSize.Width - 40, 50);
            using (LinearGradientBrush gradBrush = new LinearGradientBrush(headerRect, Color.DarkSlateBlue, Color.RoyalBlue, LinearGradientMode.Horizontal))
            {
                g.FillRectangle(gradBrush, headerRect);
                g.DrawString("GDI+ 2D VECTOR RENDERING ENGINE", new Font("Segoe UI", 12, FontStyle.Bold), Brushes.White, 35, 33);
            }

            // 2. Draw Shapes
            if (currentShape == "All" || currentShape == "Circle")
            {
                g.FillEllipse(brush, 40, 100, 120, 120);
                g.DrawEllipse(pen, 40, 100, 120, 120);
                g.DrawString("Circle (r=60)", this.Font, Brushes.Black, 60, 230);
            }

            if (currentShape == "All" || currentShape == "Rectangle")
            {
                g.FillRectangle(brush, 190, 100, 150, 120);
                g.DrawRectangle(pen, 190, 100, 150, 120);
                g.DrawString("Rectangle (150x120)", this.Font, Brushes.Black, 200, 230);
            }

            if (currentShape == "All" || currentShape == "Ellipse")
            {
                g.FillEllipse(brush, 370, 110, 160, 100);
                g.DrawEllipse(pen, 370, 110, 160, 100);
                g.DrawString("Ellipse (160x100)", this.Font, Brushes.Black, 400, 230);
            }
        }
    }

    private void btnShape_Click(object sender, EventArgs e)
    {
        Button btn = sender as Button;
        currentShape = btn.Text;
        this.Invalidate(); // Triggers OnPaint
    }
}`,
    codeExplanation: 'Uses System.Drawing.Graphics with DoubleBuffered rendering. Invalidate() schedules a redraw triggering the OnPaint event.',
    traceSteps: [
      { line: 20, explanation: 'OnPaint event triggered with Graphics context.', variables: { 'g.SmoothingMode': 'AntiAlias' }, callStack: 'OnPaint' },
      { line: 35, explanation: 'Draw anti-aliased Circle at (40, 100) with size 120x120.', variables: { shape: '"Circle"' }, outputLog: 'Rendered Circle.' },
      { line: 42, explanation: 'Draw Rectangle at (190, 100) with size 150x120.', variables: { shape: '"Rectangle"' }, outputLog: 'Rendered Rectangle.' }
    ],
    simulatedOutput: [
      'GDI+ Canvas Initialized: AntiAlias Active',
      'Rendered: Gradient Header Banner',
      'Rendered: Circle (r=60), Rectangle (150x120), Ellipse (160x100)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Override OnPaint', description: 'In Form code, override protected override void OnPaint(PaintEventArgs e).' },
      { stepNumber: 2, title: 'Import Namespaces', description: 'Add using System.Drawing and using System.Drawing.Drawing2D;' },
      { stepNumber: 3, title: 'Use Invalidate()', description: 'When buttons change shape or color, call this.Invalidate() to force repainting.' }
    ],
    vivaQuestions: [
      { question: 'What is GDI+ in .NET and what is the role of the Invalidate() method?', shortAnswer: 'GDI+ is the 2D graphics subsystem; Invalidate() marks a region of the form as invalid and triggers the Paint event.', detailedAnswer: 'Invalidate() does not draw immediately; it posts a WM_PAINT message to Windows message queue, ensuring efficient batch rendering.' }
    ],
    emulatorType: 'gdi-shape-drawing'
  }
];
