def cellRange (first, last):
    """Generates a range of spreadsheet cell addresses starting
    at cell 'first' and ending at cell 'last'. For 2-dimensional
    ranges, enumeration goes column by column."""

    def colAndRow(address):
        """Returns the column and row of a cell address"""
        col = ""
        while "A" <= address[0] <= "Z":
            col += address[0]
            address = address[1:]
        return col,int(address)

    def rowAndCol(address):
        """Returns the row and column 0-based indices for the given cell address.
        Thus, for instance, rowAndCol ("H6") returns 5,7."""
        col,row = colAndRow(address)
        rowNumber = row - 1
        colNumber = ord(col[-1])-ord('A')
        if len(col)==2:
            colNumber += 26*(ord(col[0])-ord('A')+1)
        return rowNumber,colNumber

    def colRange(firstcol,lastcol):
        """Returns a list of cols between firstcol and lastcol."""
        def nextcol(col) :
            if col[-1] < "Z": return col[:-1]+ chr(ord(col[-1])+1)
            if len(col)==1: return "AA"
            if col[-2] < "Z": return col[:-2]+ chr(ord(col[-2])+1)+ "A"
            return "A"+col
        col = firstcol
        result = []
        while col!=lastcol:
            result+=[col]
            col = nextcol(col)
        return result+[lastcol]

    firstCol,firstRow = colAndRow(first)
    lastCol,lastRow = colAndRow(last)
    result = []
    for col in colRange(firstCol, lastCol):
        for row in range(firstRow,lastRow+1):
            result += [col+str(row)]
    return [rowAndCol(a) for a in result]


def main (filename):
    import xlrd,json,datetime
    sheet = 0

    # Open the spreadsheet
    try:
        bk = xlrd.open_workbook(filename,on_demand=True)
    except IOError:
        raise IOError("Could not open spreadsheet "+filename)
        exit(-1)

    # Read the worksheet we are interested in
    news = []


    sheet_name = 'Sheet1'
    try:
        sheet = bk.sheet_by_name(sheet_name)
    except xlrd.biffh.XLRDError:
        raise IOError("Spreadsheet file "+filename+" does not have a sheet named "+sheet_name)
        exit(-1)


    for line in range(2, 1929):

        for rowx,colx in cellRange("A"+str(line),"A"+str(line)):
            author = sheet.cell_value(rowx,colx)
            
        for rowx,colx in cellRange("B"+str(line),"B"+str(line)):
            candidate = sheet.cell_value(rowx,colx)

        for rowx,colx in cellRange("D"+str(line),"D"+str(line)):
            date = sheet.cell_value(rowx,colx)

        for rowx,colx in cellRange("E"+str(line),"E"+str(line)):
            source = sheet.cell_value(rowx,colx)

        for rowx,colx in cellRange("F"+str(line),"F"+str(line)):
            title = sheet.cell_value(rowx,colx)

        for rowx,colx in cellRange("G"+str(line),"G"+str(line)):
            url = sheet.cell_value(rowx,colx)

        news.append({
            "autores": author,
            "candidato": candidate,
            "data": date,
            "fonte": source,
            "título": title,
            "url": url
        })

    f = open ("raw-data.json", "w")
    j = json.dumps(news, sort_keys=False, indent=2, ensure_ascii=False)
    f.write(j)
    f.close()


main ("dados.xlsx")
