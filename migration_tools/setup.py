#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Setup script for WordPress migration tools
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Packages installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing packages: {e}")
        return False

def main():
    print("WordPress Migration Tools Setup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("requirements.txt"):
        print("requirements.txt not found. Please run this script from the migration_tools directory.")
        sys.exit(1)
    
    # Install requirements
    if install_requirements():
        print("\nSetup completed successfully!")
        print("\nNext steps:")
        print("1. Export your WordPress site as XML (Tools > Export > All content)")
        print("2. Save the XML file in the migration_tools directory")
        print("3. Run: python wordpress_to_static.py your_export.xml")
        print("\nFor more help, see the README.md file")
    else:
        print("\nSetup failed. Please check the error messages above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
