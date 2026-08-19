import { CheatsheetItem } from '../types';

export const cheatsheetItems: CheatsheetItem[] = [
  {
    category: 'Visual Studio & WinForms',
    title: 'Toolbox & Controls Cheatsheet',
    syntax: 'Toolbox -> Drag Control -> Set Properties -> Wire Events in Events Tab (Lightning Icon ⚡)',
    description: 'Crucial properties and event mappings for Windows Forms UI development.',
    example: `// Button Click
private void btnSubmit_Click(object sender, EventArgs e) { ... }

// TextBox TextChanged
private void txtSearch_TextChanged(object sender, EventArgs e) { ... }

// ComboBox Selection
private void cmbCourse_SelectedIndexChanged(object sender, EventArgs e) { ... }

// Form Load Lifecycle
private void Form1_Load(object sender, EventArgs e) { ... }`
  },
  {
    category: 'ADO.NET SQL Server',
    title: 'Connected vs Disconnected Quick Syntax',
    syntax: 'using System.Data.SqlClient; and using System.Data;',
    description: 'Standard boilerplate patterns for database querying in BCA practicals.',
    example: `// 1. Parameterized DML (Insert / Update / Delete)
using (SqlConnection con = new SqlConnection(connStr)) {
    string sql = "INSERT INTO EMP (EmpId, Name) VALUES (@id, @name)";
    using (SqlCommand cmd = new SqlCommand(sql, con)) {
        cmd.Parameters.AddWithValue("@id", 101);
        cmd.Parameters.AddWithValue("@name", "Ravi");
        con.Open();
        int rows = cmd.ExecuteNonQuery();
    }
}

// 2. Disconnected DataAdapter Fill into DataGridView
using (SqlConnection con = new SqlConnection(connStr)) {
    SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM EMP", con);
    DataTable dt = new DataTable();
    da.Fill(dt);
    dgv.DataSource = dt;
}`
  },
  {
    category: 'WinForms Dialogs',
    title: 'Standard Common Dialogs Pattern',
    syntax: 'using (XDialog dlg = new XDialog()) { if (dlg.ShowDialog() == DialogResult.OK) { ... } }',
    description: 'Safe usage of ColorDialog, FontDialog, OpenFileDialog, and SaveFileDialog.',
    example: `// Open File Dialog
using (OpenFileDialog ofd = new OpenFileDialog()) {
    ofd.Filter = "Image Files|*.jpg;*.png;*.bmp|All Files|*.*";
    if (ofd.ShowDialog() == DialogResult.OK) {
        picBox.Image = Image.FromFile(ofd.FileName);
    }
}

// MessageBox Alert
DialogResult res = MessageBox.Show("Delete this record?", "Confirm", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
if (res == DialogResult.Yes) { ... }`
  },
  {
    category: 'C# Language & OOP',
    title: 'Polymorphism & Virtual/Override Pattern',
    syntax: 'Base: public virtual void Method() -> Derived: public override void Method()',
    description: 'Late binding and runtime polymorphic method dispatch in C#.',
    example: `abstract class Shape {
    public abstract double Area();
}

class Circle : Shape {
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}`
  }
];
