export const practicalsPart3 = [
  {
    id: 25,
    title: 'ColorDialog & FontDialog Live Typography Studio',
    aim: 'To integrate standard common dialog boxes (ColorDialog and FontDialog) allowing the user to customize font family, size, style, background, and foreground color of text controls dynamically.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ColorDialog', 'FontDialog', 'Common Dialogs', 'Typography'],
    algorithm: [
      'Add ColorDialog `colorDlg` and FontDialog `fontDlg` components.',
      'Add Label or RichTextBox `lblPreview` with sample text.',
      'In `btnChangeFont_Click`: set `fontDlg.Font = lblPreview.Font;` and call `if (fontDlg.ShowDialog() == DialogResult.OK) lblPreview.Font = fontDlg.Font;`.',
      'In `btnTextColor_Click`: call `if (colorDlg.ShowDialog() == DialogResult.OK) lblPreview.ForeColor = colorDlg.Color;`.',
      'In `btnBgColor_Click`: assign `lblPreview.BackColor = colorDlg.Color;`.',
      'Display updated Font Name, Size, and Color Hex codes in status labels.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormTypographyStudio : Form
{
    public FormTypographyStudio()
    {
        InitializeComponent();
    }

    private void btnChangeFont_Click(object sender, EventArgs e)
    {
        using (FontDialog fontDlg = new FontDialog())
        {
            fontDlg.ShowColor = true;
            fontDlg.Font = lblSampleText.Font;
            fontDlg.Color = lblSampleText.ForeColor;

            if (fontDlg.ShowDialog() == DialogResult.OK)
            {
                lblSampleText.Font = fontDlg.Font;
                lblSampleText.ForeColor = fontDlg.Color;
                UpdateFontInfo();
            }
        }
    }

    private void btnBgColor_Click(object sender, EventArgs e)
    {
        using (ColorDialog colorDlg = new ColorDialog())
        {
            colorDlg.FullOpen = true;
            colorDlg.Color = pnlPreview.BackColor;

            if (colorDlg.ShowDialog() == DialogResult.OK)
            {
                pnlPreview.BackColor = colorDlg.Color;
                lblBgHex.Text = $"Background: #{colorDlg.Color.R:X2}{colorDlg.Color.G:X2}{colorDlg.Color.B:X2}";
            }
        }
    }

    private void UpdateFontInfo()
    {
        Font f = lblSampleText.Font;
        lblFontInfo.Text = $"Font: {f.Name}, {f.SizeInPoints:0.#}pt ({(f.Bold ? "Bold " : "")}{(f.Italic ? "Italic" : "")})";
    }
}`,
    codeExplanation: 'Demonstrates modal common dialogs in WinForms. Modal dialogs suspend caller thread until user clicks OK or Cancel, returning DialogResult.',
    traceSteps: [
      { line: 15, explanation: 'Instantiate FontDialog and set initial font properties.', variables: { 'fontDlg.ShowColor': true }, callStack: 'btnChangeFont_Click' },
      { line: 21, explanation: 'User selects "Consolas, 16pt, Bold". fontDlg.ShowDialog() returns DialogResult.OK.', variables: { font: '"Consolas, 16pt, Bold"' }, callStack: 'btnChangeFont_Click' },
      { line: 23, explanation: 'Apply selected Font to lblSampleText and update status text.', variables: { applied: true }, outputLog: 'Applied Font: Consolas, 16pt Bold' }
    ],
    simulatedOutput: [
      'Font changed to: Consolas, 16pt, Bold',
      'Text Color changed to: Navy (#000080)',
      'Background Color changed to: Light Yellow (#FFFFE0)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Dialog Components', description: 'Drag ColorDialog and FontDialog from Dialogs section in Toolbox onto the Form.' },
      { stepNumber: 2, title: 'ShowDialog() Check', description: 'Check if (dlg.ShowDialog() == DialogResult.OK) before assigning properties.' }
    ],
    vivaQuestions: [
      { question: 'What does ShowDialog() return in Windows Forms?', shortAnswer: 'It returns a DialogResult enum value indicating whether the user clicked OK, Cancel, Yes, No, or Abort.', detailedAnswer: 'Unlike .Show() which displays a modeless window, .ShowDialog() displays a modal dialog and blocks until closed.' }
    ],
    emulatorType: 'colordialog-fontdialog'
  },
  {
    id: 26,
    title: 'ImageList & TabControl Multi-tab Catalog',
    aim: 'To create a multi-tabbed interface using TabControl with attached ImageList icons to organize software modules (Dashboard, Students, Courses, Settings).',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'TabControl', 'ImageList', 'TabPages', 'UI Organization'],
    algorithm: [
      'Add `ImageList` component `imgListIcons` with 4 icons (32x32).',
      'Add `TabControl` `tabControlMain` and set `ImageList = imgListIcons`.',
      'Create 4 TabPages: Dashboard, Students, Courses, System Settings.',
      'Assign `ImageIndex = 0, 1, 2, 3` to respective TabPages.',
      'Populate each TabPage with appropriate controls.',
      'Handle `SelectedIndexChanged` to update status bar.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormTabbedApp : Form
{
    public FormTabbedApp()
    {
        InitializeComponent();
    }

    private void tabControlMain_SelectedIndexChanged(object sender, EventArgs e)
    {
        TabPage currentTab = tabControlMain.SelectedTab;
        lblStatus.Text = $"Active View: {currentTab.Text} (Tab #{tabControlMain.SelectedIndex + 1})";
    }

    private void btnAddCustomTab_Click(object sender, EventArgs e)
    {
        string tabTitle = $"Report #{tabControlMain.TabPages.Count + 1}";
        TabPage newPage = new TabPage(tabTitle);
        newPage.ImageIndex = 0;

        Label lbl = new Label { Text = $"Dynamic Content for {tabTitle}", AutoSize = true, Location = new System.Drawing.Point(30, 30) };
        newPage.Controls.Add(lbl);

        tabControlMain.TabPages.Add(newPage);
        tabControlMain.SelectedTab = newPage;
    }
}`,
    codeExplanation: 'TabControl allows splitting dense UI into distinct visual pages. ImageList provides a shared sprite sheet of icons indexed by integers.',
    traceSteps: [
      { line: 12, explanation: 'User switches from "Dashboard" to "Students" tab.', variables: { selectedIndex: 1, tabText: '"Students"' }, callStack: 'tabControlMain_SelectedIndexChanged' },
      { line: 15, explanation: 'Update status label with active tab name.', variables: { status: '"Active View: Students"' }, outputLog: 'Switched to Students Tab.' }
    ],
    simulatedOutput: [
      'Form Loaded: Multi-tab Application',
      'Tab 1: Dashboard (Overview Metrics)',
      'Tab 2: Student Registry (Data Entry)',
      'Tab 3: Course Catalog (Subjects)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ImageList & TabControl', description: 'Drag ImageList and TabControl onto Form. Set TabControl.ImageList property.' },
      { stepNumber: 2, title: 'Configure TabPages Collection', description: 'In TabControl Properties -> Click TabPages (Collection) -> Add pages and set Text and ImageIndex.' }
    ],
    vivaQuestions: [
      { question: 'What is an ImageList component used for in Windows Forms?', shortAnswer: 'It acts as a centralized image repository used to assign icons to TabControls, TreeViews, ListViews, and Toolbars.', detailedAnswer: 'ImageList stores Bitmap images in a zero-indexed collection with consistent dimensions (e.g., 16x16, 32x32).' }
    ],
    emulatorType: 'imagelist-tabcontrol'
  },
  {
    id: 27,
    title: 'TrackBar & ProgressBar Real-time Value Synchronization',
    aim: 'To synchronize a TrackBar slider control with a ProgressBar and dynamic numerical labels, demonstrating Scroll events and bound progress updates.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['WinForms', 'TrackBar', 'ProgressBar', 'Scroll Event', 'Synchronization'],
    algorithm: [
      'Add `TrackBar` `tbVolume` with Minimum = 0, Maximum = 100, TickFrequency = 10.',
      'Add `ProgressBar` `prgVolume` with Minimum = 0, Maximum = 100.',
      'Add numerical display Labels.',
      'Handle `tbVolume.Scroll` event.',
      'Set `prgVolume.Value = tbVolume.Value;`.',
      'Update label: $\"Volume Level: {tbVolume.Value}%\" with dynamic color coding.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormTrackProgress : Form
{
    public FormTrackProgress()
    {
        InitializeComponent();
        trackBarLevel.Minimum = 0;
        trackBarLevel.Maximum = 100;
        progressBarLevel.Minimum = 0;
        progressBarLevel.Maximum = 100;
    }

    private void trackBarLevel_Scroll(object sender, EventArgs e)
    {
        int val = trackBarLevel.Value;
        progressBarLevel.Value = val;
        lblValue.Text = $"Level: {val}%";

        if (val < 40)
        {
            lblStatus.Text = "Status: Low / Quiet (Safe)";
            lblStatus.ForeColor = Color.DarkGreen;
        }
        else if (val < 75)
        {
            lblStatus.Text = "Status: Moderate / Optimal";
            lblStatus.ForeColor = Color.DarkOrange;
        }
        else
        {
            lblStatus.Text = "Status: High / Warning!";
            lblStatus.ForeColor = Color.Red;
        }
    }

    private void btnMute_Click(object sender, EventArgs e)
    {
        trackBarLevel.Value = 0;
        trackBarLevel_Scroll(sender, e);
    }
}`,
    codeExplanation: 'Handles the TrackBar.Scroll event, copying its Value property into ProgressBar.Value and updating dynamic thresholds.',
    traceSteps: [
      { line: 17, explanation: 'User drags TrackBar thumb to value 85.', variables: { 'trackBarLevel.Value': 85 }, callStack: 'trackBarLevel_Scroll' },
      { line: 19, explanation: 'Sync progressBarLevel.Value = 85. Status text becomes "High / Warning!".', variables: { 'progressBarLevel.Value': 85 }, outputLog: 'Synchronized value to 85%.' }
    ],
    simulatedOutput: [
      'TrackBar value dragged to 45 -> ProgressBar set to 45%',
      'TrackBar value dragged to 85 -> ProgressBar set to 85% (High Warning!)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Controls', description: 'Add TrackBar trackBarLevel and ProgressBar progressBarLevel.' },
      { stepNumber: 2, title: 'Handle Scroll Event', description: 'Double click TrackBar to open trackBarLevel_Scroll handler.' }
    ],
    vivaQuestions: [
      { question: 'Which event of TrackBar is raised when the user moves the slider thumb?', shortAnswer: 'The Scroll event (or ValueChanged event).', detailedAnswer: 'Scroll fires continuously as the slider is dragged, providing real-time feedback; ValueChanged fires after the value changes.' }
    ],
    emulatorType: 'trackbar-progressbar'
  },
  {
    id: 28,
    title: 'High-Precision Digital Stopwatch & Countdown Timer',
    aim: 'To create a digital Stopwatch with Start, Pause, Reset, and Lap recording capabilities using System.Windows.Forms.Timer control.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    tags: ['WinForms', 'Timer Control', 'Stopwatch', 'Tick Event', 'DateTime'],
    algorithm: [
      'Add `System.Windows.Forms.Timer` `timerClock` with `Interval = 100` (100ms / 0.1s resolution).',
      'Declare `TimeSpan elapsedTime;` and `DateTime startTime;`.',
      'In `btnStart_Click`: `timerClock.Start();`.',
      'In `timerClock_Tick`: increment elapsed time and update display label `\"00:00:00.0\"`.',
      'In `btnLap_Click`: record current split timestamp into `lstLaps.Items`.',
      'In `btnReset_Click`: `timerClock.Stop();`, reset elapsed time to 0, clear laps.'
    ],
    code: `using System;
using System.Diagnostics;
using System.Windows.Forms;

public partial class FormStopwatch : Form
{
    private Stopwatch stopWatch = new Stopwatch();

    public FormStopwatch()
    {
        InitializeComponent();
        timerTick.Interval = 50; // 50ms refresh rate
    }

    private void btnStart_Click(object sender, EventArgs e)
    {
        stopWatch.Start();
        timerTick.Start();
        btnStart.Enabled = false;
        btnPause.Enabled = true;
    }

    private void btnPause_Click(object sender, EventArgs e)
    {
        stopWatch.Stop();
        timerTick.Stop();
        btnStart.Enabled = true;
        btnPause.Enabled = false;
    }

    private void btnReset_Click(object sender, EventArgs e)
    {
        stopWatch.Reset();
        timerTick.Stop();
        lblTimeDisplay.Text = "00:00:00.00";
        lstLaps.Items.Clear();
        btnStart.Enabled = true;
        btnPause.Enabled = false;
    }

    private void btnLap_Click(object sender, EventArgs e)
    {
        if (stopWatch.IsRunning)
        {
            TimeSpan ts = stopWatch.Elapsed;
            string lapStr = $"Lap #{lstLaps.Items.Count + 1:D2} - {ts.Minutes:D2}:{ts.Seconds:D2}.{ts.Milliseconds / 10:D2}";
            lstLaps.Items.Insert(0, lapStr);
        }
    }

    private void timerTick_Tick(object sender, EventArgs e)
    {
        TimeSpan ts = stopWatch.Elapsed;
        lblTimeDisplay.Text = $"{ts.Hours:D2}:{ts.Minutes:D2}:{ts.Seconds:D2}.{ts.Milliseconds / 10:D2}";
    }
}`,
    codeExplanation: 'Uses System.Diagnostics.Stopwatch for accurate timing combined with WinForms Timer.Tick for fluid UI label refreshing.',
    traceSteps: [
      { line: 17, explanation: 'btnStart clicked: stopWatch.Start() and timerTick.Start() activated.', variables: { isRunning: true }, callStack: 'btnStart_Click' },
      { line: 50, explanation: 'timerTick_Tick fires every 50ms: formats hours:minutes:seconds.millis.', variables: { elapsed: '"00:01:24.45"' }, outputLog: 'Display updated: 00:01:24.45' },
      { line: 42, explanation: 'User records Lap #01 at 00:01:24.45 into ListBox.', variables: { lapsCount: 1 }, outputLog: 'Lap recorded.' }
    ],
    simulatedOutput: [
      'Stopwatch Started...',
      'Tick: 00:00:15.30',
      'Lap #01 recorded: 00:00:15.30',
      'Stopwatch Paused at 00:00:45.10'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Timer Control', description: 'Drag Timer component from Components category onto Form tray. Set Interval = 50.' },
      { stepNumber: 2, title: 'Create Stopwatch Object', description: 'Instantiate System.Diagnostics.Stopwatch in Form class.' },
      { stepNumber: 3, title: 'Handle Tick Event', description: 'Double click Timer component to write timerTick_Tick UI update method.' }
    ],
    vivaQuestions: [
      { question: 'What does the Interval property of a WinForms Timer represent?', shortAnswer: 'The time in milliseconds between each Tick event (e.g. 1000 = 1 second).', detailedAnswer: 'The WinForms Timer runs on the UI thread, making it safe for updating labels and controls directly without cross-thread dispatchers.' }
    ],
    emulatorType: 'stopwatch-timer'
  },
  {
    id: 29,
    title: 'Windows File Explorer: TreeView & ListView Explorer',
    aim: 'To build a mini Windows File Explorer in C# WinForms using TreeView for directory hierarchy and ListView with Large/Small icons for file listings.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['WinForms', 'TreeView', 'ListView', 'File System', 'TreeNode'],
    algorithm: [
      'Place `TreeView` `tvFolders` on left split panel and `ListView` `lvFiles` on right.',
      'Populate TreeView root nodes with virtual drive and folders (C:\\, D:\\, Documents, Projects).',
      'Handle `tvFolders.AfterSelect` event.',
      'Clear `lvFiles.Items.Clear();`.',
      'Add child files matching the selected directory node with file size, modified date, and icon.',
      'Provide buttons to toggle ListView View mode: Details, LargeIcon, SmallIcon, List.'
    ],
    code: `using System;
using System.IO;
using System.Windows.Forms;

public partial class FormFileExplorer : Form
{
    public FormFileExplorer()
    {
        InitializeComponent();
    }

    private void FormFileExplorer_Load(object sender, EventArgs e)
    {
        // Setup TreeView Drives
        TreeNode rootNode = new TreeNode("Local Disk (C:)", 0, 0);
        rootNode.Nodes.Add("BCA_Projects", "BCA_Projects", 1, 1);
        rootNode.Nodes.Add("Lab_Manuals", "Lab_Manuals", 1, 1);
        rootNode.Nodes.Add("Database_Dumps", "Database_Dumps", 1, 1);
        rootNode.Nodes.Add("Visual_Studio_Work", "Visual_Studio_Work", 1, 1);

        tvFolders.Nodes.Add(rootNode);
        rootNode.Expand();
    }

    private void tvFolders_AfterSelect(object sender, TreeViewEventArgs e)
    {
        lvFiles.Items.Clear();
        string selectedPath = e.Node.FullPath;
        lblCurrentPath.Text = $"Path: {selectedPath}";

        // Simulated file items for selected directory
        if (e.Node.Text == "BCA_Projects")
        {
            AddFileItem("CSharp_Calculator.sln", "Visual Studio Solution", "45 KB", "18-Oct-2026", 2);
            AddFileItem("EmployeeCRUD_App.cs", "C# Source File", "12 KB", "15-Oct-2026", 3);
            AddFileItem("App_Database.mdf", "SQL Database File", "8,192 KB", "10-Oct-2026", 4);
        }
        else if (e.Node.Text == "Lab_Manuals")
        {
            AddFileItem("BCA_Sem5_CSharp_Manual.pdf", "PDF Document", "1,450 KB", "01-Oct-2026", 5);
            AddFileItem("Viva_Questions_Bank.docx", "Word Document", "320 KB", "05-Oct-2026", 6);
        }
    }

    private void AddFileItem(string name, string type, string size, string modified, int iconIdx)
    {
        ListViewItem item = new ListViewItem(name, iconIdx);
        item.SubItems.Add(type);
        item.SubItems.Add(size);
        item.SubItems.Add(modified);
        lvFiles.Items.Add(item);
    }

    private void btnViewDetails_Click(object sender, EventArgs e) => lvFiles.View = View.Details;
    private void btnViewIcons_Click(object sender, EventArgs e) => lvFiles.View = View.LargeIcon;
}`,
    codeExplanation: 'Demonstrates TreeView hierarchy (TreeNode, Nodes collection, AfterSelect event) synchronized with multi-column ListView items.',
    traceSteps: [
      { line: 25, explanation: 'User selects TreeView node "BCA_Projects".', variables: { 'e.Node.Text': '"BCA_Projects"' }, callStack: 'tvFolders_AfterSelect' },
      { line: 31, explanation: 'Populate ListView with 3 items (CSharp_Calculator.sln, EmployeeCRUD_App.cs...).', variables: { 'lvFiles.Items.Count': 3 }, outputLog: 'Loaded 3 files into ListView.' }
    ],
    simulatedOutput: [
      'Folder selected: C:\\BCA_Projects',
      'Files listed: CSharp_Calculator.sln (45 KB), EmployeeCRUD_App.cs (12 KB), App_Database.mdf (8 MB)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add SplitContainer', description: 'Add a SplitContainer to divide Form into left TreeView and right ListView.' },
      { stepNumber: 2, title: 'Configure ListView Columns', description: 'In ListView Columns collection, add Name, Type, Size, and Date Modified.' },
      { stepNumber: 3, title: 'Wire AfterSelect', description: 'Handle TreeView AfterSelect to dynamically populate ListView.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between TreeView and ListView in WinForms?', shortAnswer: 'TreeView displays hierarchical parent-child relationships; ListView displays flat items with columns or icons.', detailedAnswer: 'TreeView uses TreeNodes; ListView supports views like Details, LargeIcon, SmallIcon, List, and Tile.' }
    ],
    emulatorType: 'treeview-listview'
  },
  {
    id: 30,
    title: 'ContextMenuStrip Right-Click Action Palette for ListBox',
    aim: 'To attach a context pop-up menu (ContextMenuStrip) to a ListBox providing right-click actions: Edit Item, Delete Item, Uppercase, and Clear All.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ContextMenuStrip', 'Right Click', 'Popups', 'ListBox Edit'],
    algorithm: [
      'Add `ContextMenuStrip` `contextMenuActions` with menu items: \"Uppercase\", \"Duplicate Item\", \"Delete Item\", \"Clear All\".',
      'Assign `lstStudents.ContextMenuStrip = contextMenuActions;`.',
      'Handle `Opening` event to disable Delete if no item is selected.',
      'In Delete click: `lstStudents.Items.RemoveAt(lstStudents.SelectedIndex);`.',
      'In Uppercase click: `lstStudents.Items[idx] = lstStudents.Items[idx].ToString().ToUpper();`.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormContextMenuDemo : Form
{
    public FormContextMenuDemo()
    {
        InitializeComponent();
        lstItems.ContextMenuStrip = contextMenuPalette;
    }

    private void contextMenuPalette_Opening(object sender, System.ComponentModel.CancelEventArgs e)
    {
        bool hasSelection = lstItems.SelectedIndex != -1;
        menuDelete.Enabled = hasSelection;
        menuUppercase.Enabled = hasSelection;
        menuDuplicate.Enabled = hasSelection;
    }

    private void menuUppercase_Click(object sender, EventArgs e)
    {
        if (lstItems.SelectedIndex != -1)
        {
            int idx = lstItems.SelectedIndex;
            lstItems.Items[idx] = lstItems.Items[idx].ToString().ToUpper();
        }
    }

    private void menuDuplicate_Click(object sender, EventArgs e)
    {
        if (lstItems.SelectedIndex != -1)
        {
            lstItems.Items.Add(lstItems.SelectedItem.ToString() + " (Copy)");
        }
    }

    private void menuDelete_Click(object sender, EventArgs e)
    {
        if (lstItems.SelectedIndex != -1)
        {
            lstItems.Items.RemoveAt(lstItems.SelectedIndex);
        }
    }

    private void menuClearAll_Click(object sender, EventArgs e)
    {
        lstItems.Items.Clear();
    }
}`,
    codeExplanation: 'Demonstrates ContextMenuStrip binding to controls, the Opening lifecycle event to validate menu item enablement, and manipulating target collections.',
    traceSteps: [
      { line: 14, explanation: 'Right click on ListBox triggers contextMenuPalette_Opening event.', variables: { hasSelection: true }, callStack: 'contextMenuPalette_Opening' },
      { line: 25, explanation: 'User clicks "Uppercase" -> transforms selected item to uppercase.', variables: { updatedText: '"DATABASE MANAGEMENT SYSTEM"' }, outputLog: 'Item text transformed to uppercase.' }
    ],
    simulatedOutput: [
      'Right clicked on "Data Structures"',
      'ContextMenu popup opened with 4 actions.',
      'Action selected: Uppercase -> Text updated to DATA STRUCTURES'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ContextMenuStrip', description: 'Drag ContextMenuStrip from Menus & Toolbars category onto Form.' },
      { stepNumber: 2, title: 'Assign to Control', description: 'In ListBox properties, set ContextMenuStrip = contextMenuPalette.' },
      { stepNumber: 3, title: 'Handle Menu Item Clicks', description: 'Double click menu items in designer to write click handlers.' }
    ],
    vivaQuestions: [
      { question: 'How is ContextMenuStrip different from MenuStrip in WinForms?', shortAnswer: 'MenuStrip sits docked at the top as the main application menu bar; ContextMenuStrip appears at cursor location on right-click.', detailedAnswer: 'Controls have a ContextMenuStrip property allowing distinct custom popup menus per control.' }
    ],
    emulatorType: 'context-menu'
  },
  {
    id: 31,
    title: 'MDI (Multiple Document Interface) Image & Text Viewer',
    aim: 'To develop an MDI Parent Form capable of spawning and managing multiple child document forms (MDI Children), including Window Cascade, Tile Horizontal, and Tile Vertical arrangements.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    tags: ['WinForms', 'MDI', 'IsMdiContainer', 'MdiParent', 'Layout'],
    algorithm: [
      'Create Parent Form `FormMdiParent` and set property `IsMdiContainer = true`.',
      'Add `MenuStrip` with File (New Document, Open Image, Exit) and Window (Cascade, Tile Horizontal, Tile Vertical).',
      'In `New Document` click: create child `FormChildDoc child = new FormChildDoc(); child.MdiParent = this; child.Show();`.',
      'In `Cascade` click: invoke `this.LayoutMdi(MdiLayout.Cascade);`.',
      'In `Tile Horizontal` click: invoke `this.LayoutMdi(MdiLayout.TileHorizontal);`.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormMdiParent : Form
{
    private int documentCount = 0;

    public FormMdiParent()
    {
        InitializeComponent();
        this.IsMdiContainer = true;
    }

    private void menuNewText_Click(object sender, EventArgs e)
    {
        documentCount++;
        Form child = new Form();
        child.Text = $"Document #{documentCount}";
        child.MdiParent = this;

        RichTextBox rtb = new RichTextBox { Dock = DockStyle.Fill };
        child.Controls.Add(rtb);

        child.Show();
    }

    private void menuCascade_Click(object sender, EventArgs e)
    {
        this.LayoutMdi(MdiLayout.Cascade);
    }

    private void menuTileHorizontal_Click(object sender, EventArgs e)
    {
        this.LayoutMdi(MdiLayout.TileHorizontal);
    }

    private void menuTileVertical_Click(object sender, EventArgs e)
    {
        this.LayoutMdi(MdiLayout.TileVertical);
    }

    private void menuCloseAll_Click(object sender, EventArgs e)
    {
        foreach (Form child in this.MdiChildren)
        {
            child.Close();
        }
    }
}`,
    codeExplanation: 'Illustrates MDI architectures where child forms are constrained within the parent canvas. LayoutMdi handles window tile geometries.',
    traceSteps: [
      { line: 17, explanation: 'Spawn Child Document #1: child.MdiParent = this; child.Show();', variables: { 'MdiChildren.Length': 1 }, callStack: 'menuNewText_Click' },
      { line: 28, explanation: 'User clicks Window -> Cascade. Invoke this.LayoutMdi(MdiLayout.Cascade).', variables: { layout: 'Cascade' }, outputLog: 'Cascaded MDI child windows.' }
    ],
    simulatedOutput: [
      'MDI Parent Container Loaded.',
      'Created Child 1: Document #1',
      'Created Child 2: Document #2',
      'Layout applied: Cascade Windows'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Enable IsMdiContainer', description: 'In Main Form Properties, set IsMdiContainer = True.' },
      { stepNumber: 2, title: 'Add MenuStrip', description: 'Add File and Window menus with New, Cascade, Tile Horizontal, and Tile Vertical.' },
      { stepNumber: 3, title: 'Set child.MdiParent', description: 'Assign child.MdiParent = this before calling child.Show().' }
    ],
    vivaQuestions: [
      { question: 'What property transforms a standard Windows Form into an MDI Container?', shortAnswer: 'The IsMdiContainer boolean property (set to true).', detailedAnswer: 'Setting IsMdiContainer = true adds an MdiClient control to the form canvas, clipping all child forms inside its boundaries.' }
    ],
    emulatorType: 'mdi-viewer'
  },
  {
    id: 32,
    title: 'RichTextBox Full-featured WordPad Mini Editor',
    aim: 'To develop a mini Rich Text Editor in C# WinForms supporting formatting (Bold, Italic, Underline), font family, font size, bullet points, text alignment, and Save/Open RTF files.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['WinForms', 'RichTextBox', 'RTF Formatting', 'SaveFileDialog', 'OpenFileDialog'],
    algorithm: [
      'Add `RichTextBox` `rtbDoc` with `Dock = DockStyle.Fill`.',
      'Add ToolStrip with buttons: Bold, Italic, Underline, Font ComboBox, Color, Bullets, Open, Save.',
      'When Bold clicked: check `rtbDoc.SelectionFont.Style`; toggle `FontStyle.Bold` using bitwise XOR `^`.',
      'When Save clicked: use `SaveFileDialog` with filter `\"RTF Files (*.rtf)|*.rtf\"` and call `rtbDoc.SaveFile(dlg.FileName, RichTextBoxStreamType.RichText);`.',
      'When Open clicked: call `rtbDoc.LoadFile(dlg.FileName, RichTextBoxStreamType.RichText);`.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormMiniWordPad : Form
{
    public FormMiniWordPad()
    {
        InitializeComponent();
    }

    private void btnBold_Click(object sender, EventArgs e)
    {
        ToggleFontStyle(FontStyle.Bold);
    }

    private void btnItalic_Click(object sender, EventArgs e)
    {
        ToggleFontStyle(FontStyle.Italic);
    }

    private void btnUnderline_Click(object sender, EventArgs e)
    {
        ToggleFontStyle(FontStyle.Underline);
    }

    private void ToggleFontStyle(FontStyle styleToToggle)
    {
        if (rtbEditor.SelectionFont != null)
        {
            Font currentFont = rtbEditor.SelectionFont;
            FontStyle newStyle = currentFont.Style ^ styleToToggle; // Bitwise XOR toggle
            rtbEditor.SelectionFont = new Font(currentFont.FontFamily, currentFont.Size, newStyle);
        }
    }

    private void btnBullets_Click(object sender, EventArgs e)
    {
        rtbEditor.SelectionBullet = !rtbEditor.SelectionBullet;
    }

    private void btnSaveFile_Click(object sender, EventArgs e)
    {
        using (SaveFileDialog saveDlg = new SaveFileDialog())
        {
            saveDlg.Filter = "Rich Text Format (*.rtf)|*.rtf|Plain Text (*.txt)|*.txt";
            if (saveDlg.ShowDialog() == DialogResult.OK)
            {
                RichTextBoxStreamType format = saveDlg.FileName.EndsWith(".txt") ? RichTextBoxStreamType.PlainText : RichTextBoxStreamType.RichText;
                rtbEditor.SaveFile(saveDlg.FileName, format);
                MessageBox.Show("Document saved successfully!", "Saved", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
}`,
    codeExplanation: 'Leverages RichTextBox SelectionFont, SelectionBullet, and native SaveFile/LoadFile streaming capabilities.',
    traceSteps: [
      { line: 29, explanation: 'Toggle Bold: Bitwise XOR on SelectionFont.Style.', variables: { newStyle: 'Bold' }, callStack: 'ToggleFontStyle' },
      { line: 44, explanation: 'SaveFile called with RichTextBoxStreamType.RichText.', variables: { path: '"MyNotes.rtf"' }, outputLog: 'File saved as RTF.' }
    ],
    simulatedOutput: [
      'Document opened: BCA_Notes.rtf',
      'Applied Bold & Italic to highlighted selection.',
      'Document saved to disk in RTF format.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ToolStrip and RichTextBox', description: 'Add ToolStrip docked to Top and RichTextBox docked to Fill.' },
      { stepNumber: 2, title: 'Implement Font Toggle', description: 'Use bitwise XOR on SelectionFont.Style to toggle Bold, Italic, and Underline.' }
    ],
    vivaQuestions: [
      { question: 'What is the key difference between TextBox and RichTextBox in WinForms?', shortAnswer: 'TextBox only supports a single uniform font/style for all text; RichTextBox supports mixed formatting (colors, fonts, bullets, images) per selection.', detailedAnswer: 'RichTextBox is based on the Windows RichEdit control and saves content using standard RTF syntax.' }
    ],
    emulatorType: 'richtextbox-editor'
  },
  {
    id: 33,
    title: 'ADO.NET SQL Server Employee CRUD (EMP)',
    aim: 'To build an ADO.NET Connected & Disconnected Architecture application in C# WinForms to perform Complete CRUD (Create, Read, Update, Delete) on an SQL Server Employee table.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 30,
    tags: ['ADO.NET', 'SqlConnection', 'SqlCommand', 'SqlDataAdapter', 'DataTable', 'CRUD', 'DataGridView'],
    algorithm: [
      'Define connection string: `string connStr = @\"Data Source=.;Initial Catalog=BCA_DB;Integrated Security=True\";`.',
      'Create method `LoadData()` using `SqlDataAdapter` and `DataTable` to bind to `dgvEmployees.DataSource`.',
      'Insert: Create parameterized `SqlCommand` (`INSERT INTO EMP (EmpId, EmpName, Department, Salary) VALUES (@id, @name, @dept, @sal)`), execute with `cmd.ExecuteNonQuery()`.',
      'Update: Execute parameterized `UPDATE EMP SET EmpName=@name, Department=@dept, Salary=@sal WHERE EmpId=@id`.',
      'Delete: Confirm deletion with MessageBox, then execute `DELETE FROM EMP WHERE EmpId=@id`.',
      'Refresh DataGridView and reset input fields.'
    ],
    code: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormEmployeeCrud : Form
{
    private string connectionString = @"Data Source=.;Initial Catalog=BCA_DB;Integrated Security=True";

    public FormEmployeeCrud()
    {
        InitializeComponent();
    }

    private void FormEmployeeCrud_Load(object sender, EventArgs e)
    {
        LoadEmployees();
    }

    private void LoadEmployees()
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            string query = "SELECT EmpId AS [ID], EmpName AS [Employee Name], Department AS [Department], Salary AS [Salary (INR)] FROM EMP";
            SqlDataAdapter da = new SqlDataAdapter(query, con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            dgvEmployees.DataSource = dt;
        }
    }

    private void btnInsert_Click(object sender, EventArgs e)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            string query = "INSERT INTO EMP (EmpId, EmpName, Department, Salary) VALUES (@id, @name, @dept, @sal)";
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@id", int.Parse(txtEmpId.Text));
                cmd.Parameters.AddWithValue("@name", txtEmpName.Text.Trim());
                cmd.Parameters.AddWithValue("@dept", cmbDept.SelectedItem.ToString());
                cmd.Parameters.AddWithValue("@sal", decimal.Parse(txtSalary.Text));

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();

                MessageBox.Show("Employee Record Inserted Successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadEmployees();
                ClearInputs();
            }
        }
    }

    private void btnUpdate_Click(object sender, EventArgs e)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            string query = "UPDATE EMP SET EmpName = @name, Department = @dept, Salary = @sal WHERE EmpId = @id";
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@id", int.Parse(txtEmpId.Text));
                cmd.Parameters.AddWithValue("@name", txtEmpName.Text.Trim());
                cmd.Parameters.AddWithValue("@dept", cmbDept.SelectedItem.ToString());
                cmd.Parameters.AddWithValue("@sal", decimal.Parse(txtSalary.Text));

                con.Open();
                int rows = cmd.ExecuteNonQuery();
                con.Close();

                if (rows > 0)
                {
                    MessageBox.Show("Employee Record Updated Successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    LoadEmployees();
                    ClearInputs();
                }
            }
        }
    }

    private void btnDelete_Click(object sender, EventArgs e)
    {
        if (MessageBox.Show("Are you sure you want to delete this record?", "Confirm", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM EMP WHERE EmpId = @id";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@id", int.Parse(txtEmpId.Text));
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();

                    MessageBox.Show("Employee Record Deleted!", "Deleted", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    LoadEmployees();
                    ClearInputs();
                }
            }
        }
    }

    private void dgvEmployees_CellClick(object sender, DataGridViewCellEventArgs e)
    {
        if (e.RowIndex >= 0)
        {
            DataGridViewRow row = dgvEmployees.Rows[e.RowIndex];
            txtEmpId.Text = row.Cells["ID"].Value.ToString();
            txtEmpName.Text = row.Cells["Employee Name"].Value.ToString();
            cmbDept.SelectedItem = row.Cells["Department"].Value.ToString();
            txtSalary.Text = row.Cells["Salary (INR)"].Value.ToString();
        }
    }

    private void ClearInputs()
    {
        txtEmpId.Clear();
        txtEmpName.Clear();
        txtSalary.Clear();
        cmbDept.SelectedIndex = -1;
    }
}`,
    codeExplanation: 'Core ADO.NET practical. Uses Parameterized SQL Queries to prevent SQL injection, SqlDataAdapter.Fill for disconnected binding, and ExecuteNonQuery for DML commands.',
    traceSteps: [
      { line: 24, explanation: 'LoadEmployees(): Open connection, SqlDataAdapter.Fill(dt), bind dgvEmployees.DataSource = dt.', variables: { rowsLoaded: 5 }, callStack: 'LoadEmployees' },
      { line: 40, explanation: 'Execute Parameterized Insert: ID=105, Name="Vikram", Dept="IT", Salary=75000.', variables: { queryType: 'INSERT' }, callStack: 'btnInsert_Click' },
      { line: 45, explanation: 'con.Open() -> cmd.ExecuteNonQuery() returns 1 row affected.', variables: { rowsAffected: 1 }, outputLog: 'Inserted 1 record into EMP table.' }
    ],
    simulatedOutput: [
      'Connected to SQL Server: BCA_DB',
      'Fetched 5 rows from EMP table.',
      'INSERT SUCCESS: EmpId=106, Name=Vikram, Dept=Cloud, Salary=85,000',
      'DataGridView reloaded with updated dataset.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Import System.Data.SqlClient', description: 'Add using System.Data; and using System.Data.SqlClient; at the top of Form.cs.' },
      { stepNumber: 2, title: 'Add DataGridView & Form Inputs', description: 'Add DataGridView dgvEmployees and TextBoxes for EmpId, EmpName, Dept, and Salary.' },
      { stepNumber: 3, title: 'Code CRUD Operations', description: 'Implement Insert, Update, Delete with parameterized SqlCommand and DataAdapter.Fill.' }
    ],
    vivaQuestions: [
      { question: 'Why should we always use Parameterized Queries instead of string concatenation in ADO.NET?', shortAnswer: 'To prevent SQL Injection attacks and handle data types/escaping automatically.', detailedAnswer: 'Parameterized queries treat input strictly as literals, eliminating vulnerabilities where malicious input could alter SQL execution logic.' },
      { question: 'What is the difference between ExecuteNonQuery(), ExecuteScalar(), and ExecuteReader()?', shortAnswer: 'ExecuteNonQuery returns rows affected (INSERT/UPDATE/DELETE); ExecuteScalar returns a single value (e.g. COUNT); ExecuteReader returns a forward-only stream.', detailedAnswer: 'Use ExecuteReader for fast read-only data streams, ExecuteScalar for aggregate functions, and ExecuteNonQuery for DML commands.' }
    ],
    emulatorType: 'adonet-sql-emp'
  },
  {
    id: 34,
    title: 'MS Access Student Registration with OleDb Connection',
    aim: 'To connect a C# WinForms application to an MS Access Database (.accdb) using OleDbConnection, OleDbDataAdapter, and OleDbCommand to register and query students.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['ADO.NET', 'MS Access', 'OleDbConnection', 'OleDbDataAdapter', 'Microsoft.ACE.OLEDB'],
    algorithm: [
      'Define OleDb Connection string: `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=StudentDB.accdb;`.',
      'Connect using `OleDbConnection` from `System.Data.OleDb`.',
      'Populate DataGridView using `OleDbDataAdapter da = new OleDbDataAdapter(\"SELECT * FROM Students\", con);`.',
      'Execute `OleDbCommand` parameterized INSERT query with student details.',
      'Display confirmation and refresh records.'
    ],
    code: `using System;
using System.Data;
using System.Data.OleDb;
using System.Windows.Forms;

public partial class FormAccessDb : Form
{
    private string connString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\StudentDB.accdb;";

    public FormAccessDb()
    {
        InitializeComponent();
    }

    private void FormAccessDb_Load(object sender, EventArgs e)
    {
        LoadStudents();
    }

    private void LoadStudents()
    {
        using (OleDbConnection con = new OleDbConnection(connString))
        {
            OleDbDataAdapter da = new OleDbDataAdapter("SELECT RollNo, StudentName, Course, Semester, Contact FROM Students", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            dgvStudents.DataSource = dt;
        }
    }

    private void btnRegister_Click(object sender, EventArgs e)
    {
        using (OleDbConnection con = new OleDbConnection(connString))
        {
            string query = "INSERT INTO Students (RollNo, StudentName, Course, Semester, Contact) VALUES (?, ?, ?, ?, ?)";
            using (OleDbCommand cmd = new OleDbCommand(query, con))
            {
                cmd.Parameters.AddWithValue("?", int.Parse(txtRollNo.Text));
                cmd.Parameters.AddWithValue("?", txtName.Text.Trim());
                cmd.Parameters.AddWithValue("?", cmbCourse.SelectedItem.ToString());
                cmd.Parameters.AddWithValue("?", int.Parse(txtSem.Text));
                cmd.Parameters.AddWithValue("?", txtContact.Text.Trim());

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();

                MessageBox.Show("Student Registered in MS Access Database!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadStudents();
            }
        }
    }
}`,
    codeExplanation: 'Illustrates connecting to Microsoft Access via OLE DB provider. Note that OLE DB uses positional question marks (?) for parameters rather than named parameters.',
    traceSteps: [
      { line: 24, explanation: 'Initialize OleDbConnection with ACE.OLEDB.12.0 provider.', variables: { provider: '"ACE.OLEDB.12.0"' }, callStack: 'LoadStudents' },
      { line: 40, explanation: 'Insert into MS Access: RollNo=201, Name="Neha Singh", Course="BCA".', variables: { rollNo: 201 }, outputLog: 'OleDb INSERT executed successfully.' }
    ],
    simulatedOutput: [
      'MS Access DB Connected: StudentDB.accdb',
      'Table: Students | 4 records loaded.',
      'Record inserted: RollNo 201 - Neha Singh (BCA)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Import System.Data.OleDb', description: 'Add using System.Data.OleDb;' },
      { stepNumber: 2, title: 'Use ? Placeholders', description: 'In OLE DB SQL queries, use ? placeholders for parameters in exact order.' }
    ],
    vivaQuestions: [
      { question: 'What OLE DB Provider is required to connect to MS Access (.accdb) in .NET?', shortAnswer: 'Microsoft.ACE.OLEDB.12.0 (or Microsoft.Jet.OLEDB.4.0 for older .mdb files).', detailedAnswer: 'The ACE OLEDB provider supports modern Office 2007+ Access files and is included in the Microsoft Access Database Engine redistributable.' }
    ],
    emulatorType: 'msaccess-crud'
  },
  {
    id: 35,
    title: 'DataGridView Instant Live Filtering & Multi-Column Sorting',
    aim: 'To implement real-time keystroke live search filtering on a DataGridView using DataView.RowFilter without querying the database repeatedly.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    tags: ['WinForms', 'DataGridView', 'DataView', 'RowFilter', 'Live Search'],
    algorithm: [
      'Load data into a `DataTable dtMaster;`.',
      'Create `DataView dv = dtMaster.DefaultView;` and bind to DataGridView.',
      'Handle `txtSearch.TextChanged` event.',
      'Construct filter expression: string filter = "EmpName LIKE \'%" + text + "%\' OR Department LIKE \'%" + text + "%\'";',
      'Set `dv.RowFilter = filter;`.',
      'Display active filtered count in status bar.'
    ],
    code: `using System;
using System.Data;
using System.Windows.Forms;

public partial class FormGridLiveSearch : Form
{
    private DataTable dtProducts;
    private DataView dvProducts;

    public FormGridLiveSearch()
    {
        InitializeComponent();
    }

    private void FormGridLiveSearch_Load(object sender, EventArgs e)
    {
        // Seed Master Dataset
        dtProducts = new DataTable();
        dtProducts.Columns.Add("ProductID", typeof(int));
        dtProducts.Columns.Add("ProductName", typeof(string));
        dtProducts.Columns.Add("Category", typeof(string));
        dtProducts.Columns.Add("UnitPrice", typeof(decimal));
        dtProducts.Columns.Add("UnitsInStock", typeof(int));

        dtProducts.Rows.Add(101, "Dell Latitude Laptop", "Electronics", 65000, 24);
        dtProducts.Rows.Add(102, "Logitech Wireless Mouse", "Accessories", 1200, 150);
        dtProducts.Rows.Add(103, "Mechanical Keyboard RGB", "Accessories", 3500, 45);
        dtProducts.Rows.Add(104, "Samsung 27-inch Monitor", "Electronics", 18500, 18);
        dtProducts.Rows.Add(105, "Sony Noise-Cancelling Headphones", "Audio", 14999, 30);
        dtProducts.Rows.Add(106, "SanDisk 1TB SSD", "Storage", 7200, 80);

        dvProducts = dtProducts.DefaultView;
        dgvLiveSearch.DataSource = dvProducts;
        UpdateCount();
    }

    private void txtSearch_TextChanged(object sender, EventArgs e)
    {
        string keyword = txtSearch.Text.Trim().Replace("'", "''");

        if (string.IsNullOrEmpty(keyword))
        {
            dvProducts.RowFilter = string.Empty;
        }
        else
        {
            dvProducts.RowFilter = $"ProductName LIKE '%{keyword}%' OR Category LIKE '%{keyword}%'";
        }

        UpdateCount();
    }

    private void UpdateCount()
    {
        lblResultCount.Text = $"Showing {dvProducts.Count} of {dtProducts.Rows.Count} items";
    }
}`,
    codeExplanation: 'Demonstrates in-memory client-side filtering using DataView.RowFilter with LIKE syntax, avoiding redundant database round-trips during live user typing.',
    traceSteps: [
      { line: 35, explanation: 'User types "Electro" in search box -> txtSearch_TextChanged fires.', variables: { keyword: '"Electro"' }, callStack: 'txtSearch_TextChanged' },
      { line: 43, explanation: 'Apply RowFilter: "ProductName LIKE \'%Electro%\' OR Category LIKE \'%Electro%\'".', variables: { 'dvProducts.Count': 2 }, outputLog: 'Filtered to 2 Electronics items.' }
    ],
    simulatedOutput: [
      'Initial Master Records: 6 items.',
      'Search typed: "Key" -> Filtered to 1 item (Mechanical Keyboard RGB)',
      'Search typed: "Accessories" -> Filtered to 2 items.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Bind DataView to Grid', description: 'Set dgv.DataSource = dtMaster.DefaultView;' },
      { stepNumber: 2, title: 'Write RowFilter in TextChanged', description: 'In txtSearch_TextChanged, assign dv.RowFilter = $"Name LIKE \'%{keyword}%\'";' }
    ],
    vivaQuestions: [
      { question: 'What is DataView in ADO.NET and how does RowFilter work?', shortAnswer: 'DataView represents a customized, bindable view of a DataTable for sorting and filtering.', detailedAnswer: 'DataView.RowFilter uses SQL-like WHERE expressions to filter rows in memory instantly without modifying underlying DataTable data.' }
    ],
    emulatorType: 'datagrid-search'
  },
  {
    id: 36,
    title: 'Database User Authentication with Role-Based Access',
    aim: 'To implement secure database-backed login verification in C# WinForms querying credentials and checking user roles (Admin vs Student) with session tracking.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    tags: ['ADO.NET', 'SqlCommand', 'ExecuteReader', 'Role-Based Access', 'Sessions'],
    algorithm: [
      'Query user table using parameterized SQL query: `SELECT UserId, FullName, Role FROM Users WHERE Username = @user AND PasswordHash = @pass`.',
      'Execute using `SqlDataReader reader = cmd.ExecuteReader();`.',
      'If `reader.Read()` returns true: extract `FullName` and `Role`.',
      'Store active session object.',
      'If role is \"Admin\", enable administrative menus; if \"Student\", open restricted student portal.',
      'If no rows found, display \"Invalid Credentials\".'
    ],
    code: `using System;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormDbAuth : Form
{
    private string connStr = @"Data Source=.;Initial Catalog=BCA_DB;Integrated Security=True";

    public FormDbAuth()
    {
        InitializeComponent();
    }

    private void btnLogin_Click(object sender, EventArgs e)
    {
        string username = txtUser.Text.Trim();
        string password = txtPassword.Text;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            MessageBox.Show("Please provide both Username and Password.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        using (SqlConnection con = new SqlConnection(connStr))
        {
            string sql = "SELECT FullName, Role, IsActive FROM Users WHERE Username = @u AND Password = @p";
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                cmd.Parameters.AddWithValue("@u", username);
                cmd.Parameters.AddWithValue("@p", password);

                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        string fullName = reader["FullName"].ToString();
                        string role = reader["Role"].ToString();
                        bool isActive = Convert.ToBoolean(reader["IsActive"]);

                        if (!isActive)
                        {
                            MessageBox.Show("This account is currently deactivated. Contact HOD.", "Account Inactive", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                            return;
                        }

                        MessageBox.Show($"Welcome, {fullName}!\nRole: {role}\nAccess Granted.", "Login Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        OpenDashboard(role, fullName);
                    }
                    else
                    {
                        MessageBox.Show("Invalid Username or Password!", "Auth Failed", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
        }
    }

    private void OpenDashboard(string role, string name)
    {
        lblSessionInfo.Text = $"Logged in as: {name} ({role})";
        pnlAdminControls.Visible = (role == "Admin");
    }
}`,
    codeExplanation: 'Uses SqlDataReader to fetch authenticated user metadata and conditionally toggles UI panels according to the user\'s authorization role.',
    traceSteps: [
      { line: 30, explanation: 'Execute parameterized SELECT query against Users table.', variables: { user: '"prof_sharma"' }, callStack: 'btnLogin_Click' },
      { line: 34, explanation: 'reader.Read() returns true. Extract FullName="Prof. Sharma", Role="Admin".', variables: { role: '"Admin"' }, outputLog: 'Authenticated as Admin.' },
      { line: 55, explanation: 'Activate Admin Panel with unrestricted privileges.', variables: { 'pnlAdminControls.Visible': true }, outputLog: 'Admin Dashboard loaded.' }
    ],
    simulatedOutput: [
      'Authenticating username: "prof_sharma"...',
      'Database Match Found: FullName="Prof. Sharma", Role="Admin"',
      'Session Established: Admin Controls Unlocked.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Parameterized Reader Query', description: 'Write SELECT query with SqlDataReader to fetch Role and status.' },
      { stepNumber: 2, title: 'Manage Session State', description: 'Conditionally enable Admin menus based on role check.' }
    ],
    vivaQuestions: [
      { question: 'Why is SqlDataReader preferred for login verification in ADO.NET?', shortAnswer: 'Because SqlDataReader is a lightweight, fast, forward-only, read-only stream of rows.', detailedAnswer: 'Unlike DataSet or DataTable which load everything in memory, SqlDataReader retrieves only what is needed with minimal memory overhead.' }
    ],
    emulatorType: 'db-auth-session'
  },
  {
    id: 37,
    title: 'Crystal Reports / Dynamic Invoice Generator for Salesman',
    aim: 'To design a reporting engine in C# WinForms to generate Sales Invoices and filtered Performance Reports by Salesman ID and Date Range.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['Crystal Reports', 'Reporting', 'Invoicing', 'Date Filter', 'Summary'],
    algorithm: [
      'Define parameters: Salesman ID and Date Range (From Date, To Date).',
      'Query sales transaction database using INNER JOIN between Salesman, Orders, and Items.',
      'Compute Subtotal, Tax (GST 18%), and Grand Total.',
      'Format output report with headers, line items, and financial summaries.',
      'Support Export to PDF / Print format.'
    ],
    code: `using System;
using System.Data;
using System.Windows.Forms;

public partial class FormSalesReport : Form
{
    private DataTable dtSales;

    public FormSalesReport()
    {
        InitializeComponent();
    }

    private void FormSalesReport_Load(object sender, EventArgs e)
    {
        // Seed Demo Sales Database
        dtSales = new DataTable();
        dtSales.Columns.Add("InvoiceNo", typeof(string));
        dtSales.Columns.Add("Salesman", typeof(string));
        dtSales.Columns.Add("OrderDate", typeof(DateTime));
        dtSales.Columns.Add("Client", typeof(string));
        dtSales.Columns.Add("Amount", typeof(decimal));

        dtSales.Rows.Add("INV-1001", "Rajesh Kumar", new DateTime(2026, 10, 1), "Apex Corp", 45000);
        dtSales.Rows.Add("INV-1002", "Anita Desai", new DateTime(2026, 10, 3), "Zenith Systems", 82000);
        dtSales.Rows.Add("INV-1003", "Rajesh Kumar", new DateTime(2026, 10, 10), "Quantum Tech", 125000);
        dtSales.Rows.Add("INV-1004", "Vikram Patel", new DateTime(2026, 10, 15), "Infra Builders", 34000);
        dtSales.Rows.Add("INV-1005", "Anita Desai", new DateTime(2026, 10, 18), "Global Trade", 96000);

        cmbSalesman.Items.AddRange(new string[] { "All Salesmen", "Rajesh Kumar", "Anita Desai", "Vikram Patel" });
        cmbSalesman.SelectedIndex = 0;
    }

    private void btnGenerateReport_Click(object sender, EventArgs e)
    {
        string selectedSalesman = cmbSalesman.SelectedItem.ToString();
        DateTime fromDate = dtpFrom.Value.Date;
        DateTime toDate = dtpTo.Value.Date;

        DataView dv = dtSales.DefaultView;
        string filter = $"OrderDate >= #{fromDate:yyyy-MM-dd}# AND OrderDate <= #{toDate:yyyy-MM-dd}#";

        if (selectedSalesman != "All Salesmen")
        {
            filter += $" AND Salesman = '{selectedSalesman}'";
        }

        dv.RowFilter = filter;
        dgvReport.DataSource = dv;

        // Calculate Totals
        decimal totalSales = 0;
        foreach (DataRowView row in dv)
        {
            totalSales += Convert.ToDecimal(row["Amount"]);
        }

        lblReportSummary.Text = $"Total Invoices: {dv.Count} | Total Revenue: ₹{totalSales:N2} | Commission (5%): ₹{(totalSales * 0.05m):N2}";
    }
}`,
    codeExplanation: 'Demonstrates parameterized multi-criteria reporting across date intervals and categorical foreign key values.',
    traceSteps: [
      { line: 35, explanation: 'Filter by Salesman="Rajesh Kumar", DateRange=01-Oct to 31-Oct.', variables: { salesman: '"Rajesh Kumar"' }, callStack: 'btnGenerateReport_Click' },
      { line: 49, explanation: 'Compute Revenue: ₹170,000.00 across 2 invoices. Commission (5%) = ₹8,500.00.', variables: { totalRevenue: 170000 }, outputLog: 'Report generated successfully.' }
    ],
    simulatedOutput: [
      'Report: Rajesh Kumar (Oct 2026)',
      'INV-1001: Apex Corp - ₹45,000',
      'INV-1003: Quantum Tech - ₹1,25,000',
      'Total Sales: ₹1,70,000.00 | Commission: ₹8,500.00'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Report Controls', description: 'Add 2 DateTimePickers (From Date, To Date), ComboBox (Salesman), and DataGridView.' },
      { stepNumber: 2, title: 'Compute Summary Aggregates', description: 'Calculate total sum and commission on filtered DataView rows.' }
    ],
    vivaQuestions: [
      { question: 'What is Crystal Reports in .NET development?', shortAnswer: 'A popular business intelligence and reporting tool integrated with Visual Studio to design pixel-perfect printable and exportable reports.', detailedAnswer: 'Crystal Reports can bind to DataSets, execute grouped aggregations, display sub-reports, and export to PDF, Excel, and Word formats.' }
    ],
    emulatorType: 'crystal-report'
  },
  {
    id: 38,
    title: 'Advanced Parameterized Filter Report: Salary & Department',
    aim: 'To build a comprehensive statistical reporting tool in C# WinForms allowing multi-dimensional filtering by Department, Salary Range, and Gender with summary metrics.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['ADO.NET', 'Analytics', 'Multi-filter', 'Aggregates', 'Reporting'],
    algorithm: [
      'Create master workforce DataTable with EmpID, Name, Dept, Salary, Gender, Experience.',
      'Add UI filters: Department ComboBox, Min/Max Salary TrackBars or NumericUpDowns, Gender RadioButtons.',
      'Construct compound `RowFilter` expression using boolean AND logic.',
      'Bind filtered result to DataGridView.',
      'Calculate Average Salary, Highest Paid, Lowest Paid, and Headcount distribution.'
    ],
    code: `using System;
using System.Data;
using System.Linq;
using System.Windows.Forms;

public partial class FormWorkforceReport : Form
{
    private DataTable dtEmp;
    private DataView dvEmp;

    public FormWorkforceReport()
    {
        InitializeComponent();
    }

    private void FormWorkforceReport_Load(object sender, EventArgs e)
    {
        dtEmp = new DataTable();
        dtEmp.Columns.Add("EmpID", typeof(int));
        dtEmp.Columns.Add("Name", typeof(string));
        dtEmp.Columns.Add("Department", typeof(string));
        dtEmp.Columns.Add("Salary", typeof(decimal));
        dtEmp.Columns.Add("Gender", typeof(string));
        dtEmp.Columns.Add("ExperienceYears", typeof(int));

        dtEmp.Rows.Add(101, "Suresh Nair", "Engineering", 85000, "Male", 6);
        dtEmp.Rows.Add(102, "Meera Iyer", "Human Resources", 62000, "Female", 4);
        dtEmp.Rows.Add(103, "Aditya Rao", "Engineering", 120000, "Male", 9);
        dtEmp.Rows.Add(104, "Pooja Hegde", "Marketing", 71000, "Female", 5);
        dtEmp.Rows.Add(105, "Rohan Das", "Finance", 95000, "Male", 7);
        dtEmp.Rows.Add(106, "Tanvi Shah", "Engineering", 92000, "Female", 6);
        dtEmp.Rows.Add(107, "Kunal Sen", "Marketing", 54000, "Male", 2);

        dvEmp = dtEmp.DefaultView;
        dgvWorkforce.DataSource = dvEmp;
        ApplyFilters();
    }

    private void ApplyFilters()
    {
        string dept = cmbDeptFilter.SelectedItem?.ToString() ?? "All";
        decimal minSal = nudMinSalary.Value;
        decimal maxSal = nudMaxSalary.Value;
        string gender = radAll.Checked ? "All" : (radMale.Checked ? "Male" : "Female");

        string filter = $"Salary >= {minSal} AND Salary <= {maxSal}";

        if (dept != "All") filter += $" AND Department = '{dept}'";
        if (gender != "All") filter += $" AND Gender = '{gender}'";

        dvEmp.RowFilter = filter;

        // Statistics
        if (dvEmp.Count > 0)
        {
            decimal totalSal = 0;
            decimal maxSalary = decimal.MinValue;
            foreach (DataRowView r in dvEmp)
            {
                decimal sal = Convert.ToDecimal(r["Salary"]);
                totalSal += sal;
                if (sal > maxSalary) maxSalary = sal;
            }

            lblStats.Text = $"Filtered Headcount: {dvEmp.Count} | Avg Salary: ₹{(totalSal / dvEmp.Count):N2} | Highest: ₹{maxSalary:N2}";
        }
        else
        {
            lblStats.Text = "No employees matched the specified criteria.";
        }
    }
}`,
    codeExplanation: 'Completes the BCA Sem 5 curriculum by demonstrating complex compound reporting, aggregates calculation, and real-time reactive filters.',
    traceSteps: [
      { line: 36, explanation: 'Apply Filters: Dept="Engineering", Gender="All", Salary=[80k - 150k].', variables: { dept: '"Engineering"', minSal: 80000, maxSal: 150000 }, callStack: 'ApplyFilters' },
      { line: 45, explanation: 'Matched 3 employees: Suresh (85k), Aditya (120k), Tanvi (92k). Average: ₹99,000.00.', variables: { matchedCount: 3, avgSalary: 99000 }, outputLog: 'Workforce Report computed.' }
    ],
    simulatedOutput: [
      'Filter: Engineering Dept, Salary ₹80,000 - ₹1,50,000',
      'Found 3 Employees.',
      'Average Salary: ₹99,000.00 | Max: ₹1,20,000.00'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Build Multi-Filter Form', description: 'Add ComboBox for Department, NumericUpDown for Salary, and RadioButtons for Gender.' },
      { stepNumber: 2, title: 'Compound Filter Expression', description: 'Construct compound RowFilter string and calculate live summary analytics.' }
    ],
    vivaQuestions: [
      { question: 'What is the role of DataView in generating reports in Windows Forms?', shortAnswer: 'DataView provides dynamic client-side sorting, searching, and filtering of table data without querying the database again.', detailedAnswer: 'It acts as an intermediate view layer between a DataTable and visual controls like DataGridView, enabling rapid sub-second dashboard reporting.' }
    ],
    emulatorType: 'parameterized-report'
  }
];
