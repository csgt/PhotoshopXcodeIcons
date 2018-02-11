# XCode-iOS-Icons.jsx

*Photoshop script to generate all iOS App Icon PNGs and JSON file, packed in a single folder to replace in your XCode Project*

The script need a 1024x1024 PNG with no transparency as an input and a destination folder as an output.  The script will do the rest.

The script will create an `AppIcon.appiconset` folder on your destination folder with the PNGs as well as the JSON file.  You may replace your current `AppIcon.appiconset` with the newly generated one directly.

## Installation

1. Download or clone repo
2. Copy `XCode-iOS-Icons.jsx` to `/Applications/Adobe Photoshop CC 2017/Presets/Scripts/` (or equivalent)

## Usage

1. Open Photoshop
2. Select File > Scripts > XCode-iOS-Icons
3. Follow the dialog prompts

## Warning!

This script does not handle naming collisions, it will overwrite any existing files with the same names in the destination directory.

## Documentation

* Adobe [Photoshop JavaScript Reference](http://www.adobe.com/devnet/photoshop/scripting.html)

* Apple iOS Human Interface Guidelines, [Icon and Image Sizes](https://developer.apple.com/library/ios/documentation/userexperience/conceptual/mobilehig/IconMatrix.html)

## Credits

Modified and maintained by [@csgt](https://github.com/csgt)

Original [script](https://gist.github.com/mattdipasquale/711203) by [@mattdipasquale](https://github.com/mattdipasquale)
