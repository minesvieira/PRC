<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <h1 style="background:black; color:white;"> <center>Project Record</center></h1>
                <meta charset="UTF-8"></meta>
            </head>
            <body>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        
        <table width="100%" style="margin-left:30px">
            <tr width="50%">
                <td>
                    <p><b>Key Name: </b><xsl:value-of select="keyname"/></p>
                    <p><b>Title: </b><xsl:value-of select="title"/></p>
                    <p><b>Subtitle: </b><xsl:value-of select="subtitle"/></p>
                </td>
                <td width="50%">
                    <p><b>Begin Date: </b><xsl:value-of select="bdate"/></p>
                    <p><b>End Date: </b><xsl:value-of select="edate"/></p>
                    <b>Supervisor: </b><a href="{supervisor/homepage}"><xsl:value-of select="supervisor/name"/></a>
                    <xsl:value-of select="supervisor/email"/>
                   
                </td>
            </tr>
        </table>
    </xsl:template>
    
    <xsl:template match="member">
        <hr/>
        <h3 style="margin-left:30px">Workteam</h3>
        <li style="margin-left:30px">
            <xsl:value-of select="identifier"/>
            <xsl:value-of select="name"/>
            <xsl:value-of select="email"/>
            <img src="{photo/@path}" alt="Photo" width="10%"/>
        </li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <hr/>
        <h3 style="margin-left:30px">Abstract</h3>
        <div style="margin-left:30px; margin-right:30px;">
            <xsl:apply-templates/>
        </div>
        <hr/>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <h3 style="margin-left:30px; ">Deliverables</h3>
            <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li style="margin-left:30px">
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
    
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
  
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>
        </i>
    </xsl:template>
    
    <xsl:template match="u">
        <u>
            <xsl:value-of select="."/>
        </u>
    </xsl:template>

    
    <xsl:template match="xref">
        <a href="{./@url}" target="_blank"><xsl:value-of select="."/></a>
    </xsl:template>

    
    
  
</xsl:stylesheet>
