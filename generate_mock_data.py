"""
MediAdvocate - Mock Data Generator
Run this once to create realistic fake PDFs for testing the agent.
Usage: python generate_mock_data.py
"""
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def create_mock_pdfs():
    os.makedirs("mock_data", exist_ok=True)

    # 1. EOB Denial Letter
    c1 = canvas.Canvas("mock_data/eob_denial.pdf", pagesize=letter)
    c1.setFont("Helvetica-Bold", 16)
    c1.drawString(50, 750, "EXPLANATION OF BENEFITS (EOB) - CLAIM DENIAL")
    c1.setFont("Helvetica", 12)
    y = 720
    for line in [
        "Date: September 10, 2026",
        "Patient Name: Alex Mercer",
        "Member ID: XYZ-987-654321",
        "Provider: Mercy General Hospital - Radiology Dept.",
        "",
        "CLAIM DETAILS:",
        "Date of Service: August 28, 2026",
        "Procedure: MRI Brain without Contrast",
        "CPT Code: 70553",
        "Billed Amount: $2,450.00",
        "Patient Responsibility: $2,450.00",
        "",
        "DENIAL REASON CODE: CO-45",
        "Description: Claim denied. Out-of-network provider/facility. Not covered.",
    ]:
        c1.drawString(50, y, line)
        y -= 20
    c1.save()
    print("✅ Created: mock_data/eob_denial.pdf")

    # 2. Insurance Policy
    c2 = canvas.Canvas("mock_data/insurance_policy.pdf", pagesize=letter)
    c2.setFont("Helvetica-Bold", 16)
    c2.drawString(50, 750, "GLOBAL HEALTH INSURANCE - POLICY DOCUMENT 2026")
    c2.setFont("Helvetica-Bold", 12)
    c2.drawString(50, 710, "SECTION 4: IMAGING AND DIAGNOSTICS (Page 42)")
    c2.setFont("Helvetica", 11)
    y = 680
    for line in [
        "4.1 Coverage for MRI and CT Scans:",
        "Medically necessary MRI scans are covered at 80% if the facility is in-network.",
        "",
        "4.2 Fair Market Value Clause:",
        "For CPT code 70553, the allowed amount shall not exceed $1,200.00 in zip code 90210.",
        "",
        "4.3 No Surprises Act Protection:",
        "Patients are protected from balance billing at in-network facilities.",
        "",
        "4.4 Network Status Verification:",
        "If a facility is listed as in-network in the official directory, all services",
        "rendered at that facility are covered at in-network rates, regardless of",
        "individual provider network status.",
    ]:
        c2.drawString(50, y, line)
        y -= 18
    c2.save()
    print("✅ Created: mock_data/insurance_policy.pdf")

    # 3. Hospital Directory (The Adaptation Evidence)
    c3 = canvas.Canvas("mock_data/hospital_directory.pdf", pagesize=letter)
    c3.setFont("Helvetica-Bold", 16)
    c3.drawString(50, 750, "MERCY GENERAL HOSPITAL - PUBLIC NETWORK DIRECTORY")
    c3.setFont("Helvetica", 12)
    y = 710
    for line in [
        "FACILITY NETWORK STATUS VERIFICATION:",
        "",
        "Facility Name: Mercy General Hospital",
        "Address: 100 Wellness Blvd, Beverly Hills, CA 90210",
        "Phone: (555) 123-4567",
        "",
        "Network Status: IN-NETWORK (Tier 1 Preferred)",
        "Contract Effective Date: January 1, 2024",
        "Contract Expiry Date: December 31, 2027",
        "",
        "Departments:",
        "  - Radiology & Imaging Center: In-Network",
        "  - Emergency Services: In-Network",
        "  - Outpatient Surgery: In-Network",
        "",
        "Last Updated: August 15, 2026",
        "Directory ID: DIR-2026-08-MGH-001",
    ]:
        c3.drawString(50, y, line)
        y -= 20
    c3.save()
    print("✅ Created: mock_data/hospital_directory.pdf")

    print("\n🎉 All mock PDFs generated successfully in 'mock_data/' folder!")


if __name__ == "__main__":
    create_mock_pdfs()
