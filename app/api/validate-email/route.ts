import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', isValid: false, confidence: 0 },
        { status: 400 }
      )
    }

    // Call Python script to validate email using ML model
    const result = await validateEmailWithML(email)
    
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error validating email:', error)
    return NextResponse.json(
      { error: 'Failed to validate email', isValid: false, confidence: 0 },
      { status: 500 }
    )
  }
}

function validateEmailWithML(email: string): Promise<{isValid: boolean, confidence: number, features?: any}> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), 'scripts', 'validate_email.py')
    const pythonProcess = spawn('python', [scriptPath, email])
    
    let output = ''
    let errorOutput = ''
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString()
    })
    
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output.trim())
          resolve(result)
        } catch (parseError) {
          console.error('Failed to parse Python output:', parseError)
          console.error('Output:', output)
          reject(new Error('Failed to parse validation result'))
        }
      } else {
        console.error('Python script error:', errorOutput)
        reject(new Error(`Python script failed with code ${code}`))
      }
    })
    
    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error)
      reject(error)
    })
  })
}