#!/usr/bin/env ruby
# frozen_string_literal: true

# Minimal check: gaode_key + gaode_security_key (高德安全密钥) survive YAML as non-empty strings.
# Run from repo root: ruby scripts/verify-visitor-map-config.rb

require 'yaml'

config = YAML.load_file(File.expand_path('../_config.yml', __dir__))
vm = config['visitor_map'] || {}
key = vm['gaode_key']
sec = vm['gaode_security_key']
host = vm['gaode_service_host']

puts "visitor_map present: #{!vm.empty?}"
puts "gaode_key length: #{key.to_s.length}"
puts "gaode_security_key length: #{sec.to_s.length}"
puts "gaode_service_host length: #{host.to_s.length}"

if key.nil? || key.to_s.strip.empty?
  warn 'FAIL: gaode_key is missing or empty after YAML parse.'
  exit 1
end

unless key.is_a?(String)
  warn "FAIL: gaode_key is #{key.class} (expected String). Check YAML quoting."
  exit 1
end

has_plain = !sec.nil? && !sec.to_s.strip.empty?
has_proxy = !host.nil? && !host.to_s.strip.empty?

unless has_proxy || has_plain
  warn 'FAIL: set either gaode_service_host (proxy) or gaode_security_key (plaintext) per AMap security docs.'
  exit 1
end

if has_proxy && !host.is_a?(String)
  warn "FAIL: gaode_service_host is #{host.class} (expected String)."
  exit 1
end

if has_plain && !sec.is_a?(String)
  warn "FAIL: gaode_security_key is #{sec.class} (expected String)."
  exit 1
end

puts 'OK'
exit 0
