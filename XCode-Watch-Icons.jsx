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
            { "name": "48", "size": 48 },
            { "name": "55", "size": 55 },
            { "name": "58", "size": 58 },
            { "name": "87", "size": 87 },
            { "name": "80", "size": 80 },
            { "name": "88", "size": 88 },
            { "name": "100", "size": 100 },
            { "name": "172", "size": 172 },
            { "name": "196", "size": 196 },
            { "name": "216", "size": 216 },
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
                \"filename\" : \"48.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"notificationCenter\",\
                \"scale\" : \"2x\",\
                \"size\" : \"24x24\",\
                \"subtype\" : \"38mm\"\
              },\
              {\
                \"filename\" : \"55.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"notificationCenter\",\
                \"scale\" : \"2x\",\
                \"size\" : \"27.5x27.5\",\
                \"subtype\" : \"42mm\"\
              },\
              {\
                \"filename\" : \"58.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"companionSettings\",\
                \"scale\" : \"2x\",\
                \"size\" : \"29x29\"\
              },\
              {\
                \"filename\" : \"87.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"companionSettings\",\
                \"scale\" : \"3x\",\
                \"size\" : \"29x29\"\
              },\
              {\
                \"filename\" : \"80.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"appLauncher\",\
                \"scale\" : \"2x\",\
                \"size\" : \"40x40\",\
                \"subtype\" : \"38mm\"\
              },\
              {\
                \"filename\" : \"88.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"appLauncher\",\
                \"scale\" : \"2x\",\
                \"size\" : \"44x44\",\
                \"subtype\" : \"40mm\"\
              },\
              {\
                \"filename\" : \"100.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"appLauncher\",\
                \"scale\" : \"2x\",\
                \"size\" : \"50x50\",\
                \"subtype\" : \"44mm\"\
              },\
              {\
                \"filename\" : \"172.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"quickLook\",\
                \"scale\" : \"2x\",\
                \"size\" : \"86x86\",\
                \"subtype\" : \"38mm\"\
              },\
              {\
                \"filename\" : \"196.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"quickLook\",\
                \"scale\" : \"2x\",\
                \"size\" : \"98x98\",\
                \"subtype\" : \"42mm\"\
              },\
              {\
                \"filename\" : \"216.png\",\
                \"idiom\" : \"watch\",\
                \"role\" : \"quickLook\",\
                \"scale\" : \"2x\",\
                \"size\" : \"108x108\",\
                \"subtype\" : \"44mm\"\
              },\
              {\
                \"filename\" : \"1024.png\",\
                \"idiom\" : \"watch-marketing\",\
                \"scale\" : \"1x\",\
                \"size\" : \"1024x1024\"\
              }\
            ],\
            \"info\" : {\
              \"author\" : \"xcode\",\
              \"version\" : 1\
            }\
          }\
          ");
        file.close();

        alert("XCode Watch Icons created!");
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