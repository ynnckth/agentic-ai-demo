// Simple sun icon for the weather card
function SunIcon() {
  return (
    <div style={{ width: '48px', height: '48px', flexShrink: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: '100%', height: '100%', color: '#fef08a' }}
      >
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          strokeWidth="2"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

interface WeatherCardProps {
  location?: string;
  temperature?: string;
  condition?: string;
  humidity?: string;
  wind?: string;
  feels_like?: string;
}

// Weather card component where the location is based on what the agent sets via tool calls.
export function WeatherCard({
  location = 'Unknown',
  temperature = 'N/A',
  condition = 'N/A',
  humidity = 'N/A',
  wind = 'N/A',
  feels_like = 'N/A',
}: WeatherCardProps) {
  return (
    <div
      style={{
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        marginTop: '24px',
        marginBottom: '16px',
        width: '384px',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'capitalize',
                margin: 0,
              }}
            >
              {location}
            </h3>
            <p style={{ color: 'white', margin: '4px 0 0 0' }}>Current Weather</p>
          </div>
          <SunIcon />
        </div>

        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {temperature}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'white',
            }}
          >
            {condition}
          </div>
        </div>

        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              textAlign: 'center',
            }}
          >
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', margin: '0 0 4px 0' }}>Humidity</p>
              <p style={{ color: 'white', fontWeight: '500', margin: 0 }}>{humidity}</p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', margin: '0 0 4px 0' }}>Wind</p>
              <p style={{ color: 'white', fontWeight: '500', margin: 0 }}>{wind}</p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', margin: '0 0 4px 0' }}>Feels Like</p>
              <p style={{ color: 'white', fontWeight: '500', margin: 0 }}>{feels_like}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
