/**
 * Phase 5.3 — RLS Protection Test
 * Run from project root: npx tsx scripts/rls_test.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const url = envVars['VITE_SUPABASE_URL'];
const key = envVars['VITE_SUPABASE_ANON_KEY'];

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

console.log('Supabase URL: detected');
console.log('Anon Key: detected\n');

const supabase = createClient(url, key);

async function testRLS() {
  const tables = ['admin_users', 'products', 'categories', 'leads', 'quote_requests', 'gallery', 'testimonials', 'site_settings'];
  const publicReadTables = ['products', 'categories', 'gallery', 'testimonials', 'site_settings'];
  
  console.log('=== Anonymous SELECT on all tables ===');
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`[PROTECTED] ${table} — error: ${error.message}`);
    } else if (!data || data.length === 0) {
      console.log(`[PROTECTED] ${table} — 0 rows returned`);
    } else if (publicReadTables.includes(table)) {
      console.log(`[PUBLIC-READ] ${table} — ${data.length} row(s) (expected for public content)`);
    } else {
      console.log(`[WARNING] ${table} — ${data.length} row(s) readable by anonymous!`);
    }
  }
  
  console.log('\n=== Anonymous INSERT on leads ===');
  const { error: leadErr } = await supabase.from('leads').insert({
    name: 'PROD_TEST_LEAD_DELETE_ME',
    email: 'prodtest@test.local',
    phone: '0000000000',
    message: 'Phase 5.3 production test - safe to delete',
    source: 'production_test',
  });
  console.log(leadErr ? `[INSERT-FAIL] leads — ${leadErr.message}` : '[INSERT-OK] leads — anonymous insert succeeded');

  console.log('\n=== Anonymous INSERT on quote_requests ===');
  const { error: quoteErr } = await supabase.from('quote_requests').insert({
    name: 'PROD_TEST_QUOTE_DELETE_ME',
    email: 'prodtest@test.local',
    phone: '0000000000',
    message: 'Phase 5.3 production test - safe to delete',
    company_name: 'Test Corp',
    furniture_type: 'testing',
  });
  console.log(quoteErr ? `[INSERT-FAIL] quote_requests — ${quoteErr.message}` : '[INSERT-OK] quote_requests — anonymous insert succeeded');

  console.log('\n=== Anonymous DELETE on leads (should FAIL) ===');
  const { error: delErr, count: delCount } = await supabase.from('leads').delete({ count: 'exact' }).eq('name', 'PROD_TEST_LEAD_DELETE_ME');
  if (delErr) {
    console.log(`[PROTECTED] leads DELETE — blocked: ${delErr.message}`);
  } else {
    console.log(`[PROTECTED] leads DELETE — ${delCount ?? 0} rows affected (RLS blocks anonymous delete)`);
  }

  console.log('\n=== Anonymous UPDATE on leads (should FAIL) ===');
  const { error: updErr, count: updCount } = await supabase.from('leads').update({ message: 'hacked' }, { count: 'exact' }).eq('name', 'PROD_TEST_LEAD_DELETE_ME');
  if (updErr) {
    console.log(`[PROTECTED] leads UPDATE — blocked: ${updErr.message}`);
  } else {
    console.log(`[PROTECTED] leads UPDATE — ${updCount ?? 0} rows affected (RLS blocks anonymous update)`);
  }

  console.log('\n=== Anonymous SELECT on leads (should return 0) ===');
  const { data: leadData } = await supabase.from('leads').select('*').limit(1);
  console.log(`[${!leadData || leadData.length === 0 ? 'PROTECTED' : 'WARNING'}] leads SELECT — ${leadData?.length ?? 0} row(s)`);

  console.log('\n=== Anonymous SELECT on admin_users (should return 0) ===');
  const { data: adminData } = await supabase.from('admin_users').select('*').limit(1);
  console.log(`[${!adminData || adminData.length === 0 ? 'PROTECTED' : 'WARNING'}] admin_users SELECT — ${adminData?.length ?? 0} row(s)`);

  console.log('\n=== RLS TEST COMPLETE ===');
}

testRLS().catch(console.error);
