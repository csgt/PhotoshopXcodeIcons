// Script to create XCode icons in all needed dimensions, and generate XCode jSON file to replace in project directly
//
// https://github.com/csgt/PhotoshopXcodeIcons
//

//$.level = 1;
try {
    // Prompt user to select iTunesArtwork file. Clicking "Cancel" returns null.
    var iTunesArtwork = File.openDialog("Select a square PNG file that is at least 1024x1024.", "*.png", false);

    if (iTunesArtwork !== null) {
        var doc = open(iTunesArtwork, OpenDocumentType.PNG);
        if (doc == null) {
            throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
        }

        var startState = doc.activeHistoryState;       // save for undo
        var initialPrefs = app.preferences.rulerUnits; // will restore at end
        app.preferences.rulerUnits = Units.PIXELS;     // use pixels

        if (doc.width != doc.height) {
            throw "Image is not square";
        }
        else if ((doc.width < 1024) && (doc.height < 1024)) {
            throw "Image is too small!  Image must be at least 1024x1024 pixels.";
        }
        else if (doc.width < 1024) {
            throw "Image width is too small!  Image width must be at least 1024 pixels.";
        }
        else if (doc.height < 1024) {
            throw "Image height is too small!  Image height must be at least 1024 pixels.";
        }

        // Folder selection dialog
        var destFolder = Folder.selectDialog("Choose an output folder");

        if (destFolder == null) {
            // User canceled, just exit
            throw "";
        }

        // Save icons in PNG using Save for Web.
        var sfw = new ExportOptionsSaveForWeb();
        sfw.format = SaveDocumentType.PNG;
        sfw.PNG8 = false; // use PNG-24
        sfw.transparency = false;
        doc.info = null;  // delete metadata

        var icons = [
            { "name": "20@2x", "size": 40 },
            { "name": "20@2x-1", "size": 40 },
            { "name": "20@3x", "size": 60 },
            { "name": "29@2x", "size": 58 },
            { "name": "29@2x-1", "size": 58 },
            { "name": "29@3x", "size": 87 },
            { "name": "40@2x", "size": 80 },
            { "name": "40@2x-1", "size": 80 },
            { "name": "40@3x", "size": 120 },
            { "name": "60@2x", "size": 120 },
            { "name": "60@3x", "size": 180 },
            { "name": "20@1x", "size": 20 },
            { "name": "20@2x", "size": 40 },
            { "name": "29@1x", "size": 29 },
            { "name": "40@1x", "size": 40 },
            { "name": "76@1x", "size": 76 },
            { "name": "76@2x", "size": 152 },
            { "name": "83.5@2x", "size": 167 },
            { "name": "1024", "size": 1024 },
        ];

        var icon;
        var destFolder = destFolder + "/AppIcon.appiconset/";
        var folder = Folder(destFolder);

        if (!folder.exists) folder.create();

        for (i = 0; i < icons.length; i++) {
            icon = icons[i];
            doc.resizeImage(icon.size, icon.size, // width, height
                null, ResampleMethod.BICUBICSHARPER);

            var destFileName = icon.name + ".png";
            doc.exportDocument(new File(destFolder + destFileName), ExportType.SAVEFORWEB, sfw);
            doc.activeHistoryState = startState; // undo resize
        }

        //Create the Contents.json file needed by XCode
        var file = new File(destFolder + "Contents.json");
        file.open("e", "TEXT", "????");
        file.seek(0, 2);
        $.os.search(/windows/i) != -1 ? file.lineFeed = 'windows' : file.lineFeed = 'macintosh';
        file.write("{\
  \"images\" : [\
    {\
      \"size\" : \"20x20\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"20@2x.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"20x20\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"20@3x.png\",\
      \"scale\" : \"3x\"\
    },\
    {\
      \"size\" : \"29x29\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"29@2x.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"29x29\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"29@3x.png\",\
      \"scale\" : \"3x\"\
    },\
    {\
      \"size\" : \"40x40\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"40@2x.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"40x40\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"40@3x.png\",\
      \"scale\" : \"3x\"\
    },\
    {\
      \"size\" : \"60x60\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"60@2x.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"60x60\",\
      \"idiom\" : \"iphone\",\
      \"filename\" : \"60@3x.png\",\
      \"scale\" : \"3x\"\
    },\
    {\
      \"size\" : \"20x20\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"20@1x.png\",\
      \"scale\" : \"1x\"\
    },\
    {\
      \"size\" : \"20x20\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"20@2x-1.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"29x29\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"29@1x.png\",\
      \"scale\" : \"1x\"\
    },\
    {\
      \"size\" : \"29x29\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"29@2x-1.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"40x40\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"40@1x.png\",\
      \"scale\" : \"1x\"\
    },\
    {\
      \"size\" : \"40x40\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"40@2x-1.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"76x76\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"76@1x.png\",\
      \"scale\" : \"1x\"\
    },\
    {\
      \"size\" : \"76x76\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"76@2x.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"83.5x83.5\",\
      \"idiom\" : \"ipad\",\
      \"filename\" : \"83.5@2x.png\",\
      \"scale\" : \"2x\"\
    },\
    {\
      \"size\" : \"1024x1024\",\
      \"idiom\" : \"ios-marketing\",\
      \"filename\" : \"1024.png\",\
      \"scale\" : \"1x\"\
    }\
  ],\
  \"info\" : {\
    \"version\" : 1,\
    \"author\" : \"xcode\"\
  }\
}");
        file.close();

        alert("XCode Icons created!");
    }
}
catch (exception) {
    // Show degbug message and then quit
    if ((exception != null) && (exception != ""))
        alert(exception);
}
finally {
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);
    app.preferences.rulerUnits = initialPrefs; // restore prefs
}
