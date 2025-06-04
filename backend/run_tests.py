import os
import pdfkit

# Run tests and generate HTML report
os.system("pytest tests/ --html=report.html --self-contained-html")


print("Test report generated as report.html")
