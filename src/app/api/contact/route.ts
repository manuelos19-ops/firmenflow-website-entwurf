import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, website } = body;

    // Honeypot-Check
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Basis-Validierung
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen.' },
        { status: 400 }
      );
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      );
    }

    // TODO: Resend-Integration hinzufügen wenn API Key vorhanden
    // Für jetzt: Log die Anfrage (auf Vercel sichtbar in Function Logs)
    console.log('=== Neue Projektanfrage ===');
    console.log('Name:', name);
    console.log('E-Mail:', email);
    console.log('Telefon:', phone || 'nicht angegeben');
    console.log('Service:', service);
    console.log('Nachricht:', message || 'keine Nachricht');
    console.log('========================');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Serverfehler. Bitte versuche es erneut.' },
      { status: 500 }
    );
  }
}
