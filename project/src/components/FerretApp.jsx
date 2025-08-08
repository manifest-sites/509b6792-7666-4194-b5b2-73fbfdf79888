import { useState, useEffect } from 'react'
import { Card, Button, Typography, Space, Row, Col } from 'antd'

const { Title, Paragraph } = Typography

const ferretFacts = [
  "Ferrets sleep up to 18-20 hours per day!",
  "A group of ferrets is called a 'business'",
  "Ferrets can live up to 10 years with proper care",
  "Baby ferrets are called kits",
  "Ferrets have been domesticated for over 2,000 years",
  "Ferrets are naturally curious and love to explore",
  "A ferret's heart beats 200-250 times per minute",
  "Ferrets are crepuscular - most active during dawn and dusk"
]

const ferretImages = [
  "🐰", "🦦", "🐾", "🏠", "🌟", "💤", "🎾", "🧸"
]

function FerretApp() {
  const [currentFact, setCurrentFact] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % ferretFacts.length)
  }

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + ferretFacts.length) % ferretFacts.length)
  }

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        nextFact()
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Title level={1} className="text-brown-800 mb-2">
            🐰 Fantastic Ferrets 🐰
          </Title>
          <Paragraph className="text-lg text-gray-600">
            Discover amazing facts about these playful creatures!
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} md={16}>
            <Card 
              className="shadow-lg border-0 h-full"
              style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' }}
            >
              <div className="text-center p-6">
                <div className="text-6xl mb-6">
                  {ferretImages[currentFact]}
                </div>
                <Title level={3} className="text-amber-800 mb-4">
                  Ferret Fact #{currentFact + 1}
                </Title>
                <Paragraph className="text-lg text-gray-700 mb-6 min-h-16">
                  {ferretFacts[currentFact]}
                </Paragraph>
                
                <Space size="middle">
                  <Button 
                    onClick={prevFact}
                    size="large"
                    className="bg-amber-500 border-amber-500 hover:bg-amber-600"
                    type="primary"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    size="large"
                    type={isPlaying ? "default" : "primary"}
                    className={isPlaying ? "" : "bg-green-500 border-green-500 hover:bg-green-600"}
                  >
                    {isPlaying ? "⏸️ Pause" : "▶️ Auto Play"}
                  </Button>
                  <Button 
                    onClick={nextFact}
                    size="large"
                    className="bg-amber-500 border-amber-500 hover:bg-amber-600"
                    type="primary"
                  >
                    Next
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card 
              title="🏠 Ferret Care Tips"
              className="shadow-lg border-0 h-full"
              headStyle={{ background: '#f59e0b', color: 'white' }}
            >
              <ul className="space-y-2 text-gray-700">
                <li>• Provide a spacious, multi-level cage</li>
                <li>• Feed high-quality ferret kibble</li>
                <li>• Ensure 4+ hours of play time daily</li>
                <li>• Regular veterinary check-ups</li>
                <li>• Ferret-proof your home safely</li>
                <li>• Keep them in pairs if possible</li>
              </ul>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card 
              className="text-center shadow-md border-0"
              style={{ background: '#fef3c7' }}
            >
              <div className="text-3xl mb-2">💤</div>
              <Title level={4} className="text-amber-800">Sleepy Pets</Title>
              <Paragraph className="text-sm">
                Ferrets love their beauty sleep!
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              className="text-center shadow-md border-0"
              style={{ background: '#fef3c7' }}
            >
              <div className="text-3xl mb-2">🎾</div>
              <Title level={4} className="text-amber-800">Playful Nature</Title>
              <Paragraph className="text-sm">
                They love toys and games!
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              className="text-center shadow-md border-0"
              style={{ background: '#fef3c7' }}
            >
              <div className="text-3xl mb-2">🧸</div>
              <Title level={4} className="text-amber-800">Social Animals</Title>
              <Paragraph className="text-sm">
                Best kept in pairs or groups!
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FerretApp