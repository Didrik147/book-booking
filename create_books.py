# -*- coding: utf-8 -*-

import os

reviews = ["the-inheritance-games"]

file_js = open('books.js', 'w')

file_js.write('let booksArr = [ \n')

for img in os.listdir('./books/covers'):
    if img.endswith('.jpg'):
        # Getting names from images
        name = img.split('.jpg')[0]
        print(name)
        
        # Updating array with books
        file_js.write(f"\t'{name}',\n")
        
        if name not in reviews:
            # Create HTML files
            file_html = open(f'./books/{name}.html', 'w+')
            file_html.write('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book</title>
    <link rel="stylesheet" href="librarycard.css">
</head>
<body>
    <script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-firestore.js"></script>

    <script src="firebase_info.js"></script>

    <script src="librarycard.js"></script>
</body>
</html>
        ''')
        
            file_html.close()



file_js.write(']')
file_js.close()